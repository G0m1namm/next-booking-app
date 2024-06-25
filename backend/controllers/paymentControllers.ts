import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Room, { IRoom } from "../models/room";
import { getBaseUrl } from "@/lib/getBaseUrl";
import ErrorHandler from "../utils/errorHandler";
import { headers } from "next/headers";
import User from "../models/user";
import Booking from "../models/booking";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe Checkout API Controller -> /api/payment/checkout_session/:roomId
export const stripeCheckoutSession = catchAsyncErrors(
    async (req: NextRequest, {params}: {params: {id:string}}) => {
        const baseURL = getBaseUrl();
        
        const { searchParams } = new URL(req.url);
        
        const checkInDate = searchParams.get('checkInDate');
        const checkOutDate = searchParams.get('checkOutDate');
        const amount = searchParams.get('amount');
        const daysOfStay = searchParams.get('daysOfStay');

        try {
            const room = (await Room.findById(params.id)) as IRoom;  
                  
            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                success_url:`${baseURL}/bookings/me`,
                cancel_url:`${baseURL}/room/${room?._id}`,
                customer_email:req.user.email,
                client_reference_id:params?.id,
                metadata:{checkInDate,checkOutDate,daysOfStay: Number(daysOfStay)},
                mode:'payment',
                line_items:[
                    {
                       price_data : {
                        currency:'usd',
                        unit_amount:Number(amount) * 100,
                        product_data:{
                            name:room?.name,
                            description:room?.description,
                            images:[`${room?.images[0]?.url}`]
                        }
                       } ,
                       quantity:1
                    }
                ]
            });

            return NextResponse.json(session, {status: 200});
        } catch (error: any) {
            throw new ErrorHandler(error?.message, 500);
        }
    }
);

// Create new booking after payment -> /api/payment/webhook
export const webhookCheckout = async (req: NextRequest) => {
    
    try {
        const rawBody = await req.text();
        const signature = headers().get('Stripe-Signature') as string;   
             
        const event = stripe.webhooks.constructEvent(
            rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET
        );
        
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            const room = session.client_reference_id;
            const user = (await User.findOne({email: session.customer_email})).id;
            const amountPaid = session?.amount_total / 100;

            const paymentInfo ={
                id:session.payment_intent,
                status :session.payment_status
            }

            const checkInDate = session.metadata.checkInDate;
            const checkOutDate = session.metadata.checkOutDate;
            const daysOfStay = session.metadata.daysOfStay;
            
            await Booking.create({
                room,
                user,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo,
                paidAt: Date.now()
            })
        }
        return NextResponse.json({message: 'Webhook received successfully.'}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({message: `Webhook error: ${error?.message}`}, {status: 400});
    }
}
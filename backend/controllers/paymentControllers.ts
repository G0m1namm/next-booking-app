import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Room, { IRoom } from "../models/room";
import { getBaseUrl } from "@/lib/getBaseUrl";
import ErrorHandler from "../utils/errorHandler";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Stripe Checkout API Controller -> /api/payment/checkout_session/:roomId
export const stripeCheckoutSession = catchAsyncErrors(
    async (req: NextRequest, {params}: {params: {id:string}}) => {
        const baseURL = getBaseUrl();
        
        const searchParams = new URLSearchParams(req.url);
        
        const checkInDate = searchParams.get('checkInDate');
        console.log(checkInDate);
        const checkOutDate = searchParams.get('checkOutDate');
        const amount = searchParams.get('amount');
        const daysOfStay = searchParams.get('daysOfStay');
        
        const room = (await Room.findById(params.id)) as IRoom;        

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${baseURL}/bookings/me`,
                cancel_url: `${baseURL}/room/${room?._id?.toString()}`,
                customer_email: req?.user.email,
                client_reference_id: params.id,
                metadata: {checkInDate, checkOutDate, daysOfStay},
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            unit_amount: Number(amount) * 100,
                            product_data: {
                                name: room?.name,
                                description: room?.description,
                                images: [room?.images[0].url],
                            },
                        },
                        quantity: 1,
                    }
                ],
            });

            return NextResponse.json(session, {status: 200});
        } catch (error: any) {
            console.log(error);

            throw new ErrorHandler(error?.message, 500);
        }
    }
);
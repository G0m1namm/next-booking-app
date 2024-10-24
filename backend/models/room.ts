import mongoose, { Document, Schema } from 'mongoose';
import geocoder from '../../lib/geocoder';

import { IUser } from './user';

export interface ILocation {
  type: string;
  coordinates: [number, number];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
}

export interface IRoom extends Document {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: 'King' | 'Single' | 'Twins';
  reviews: IReview[];
  user: IUser;
  createdAt: Date;
}
const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter room name'],
    trim: true,
    maxLength: [200, 'Room name can not exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter room description'],
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Please enter room price'],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, 'Please enter room address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAdress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, 'Please enter room guest capacity'],
  },
  numOfBeds: {
    type: Number,
    required: [true, 'Please enter the number of beds in the room'],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter room category'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'Please select correct category for the room',
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Set location object using GeoCoder
roomSchema.pre('save', async function () {
  const loc = await geocoder.geocode(this.address);
  const { latitude, longitude, formattedAddress, city, stateCode, zipcode, countryCode } =
    loc[0];
  this.location = {
    type: 'Point',
    coordinates: [longitude, latitude],
    formattedAddress,
    city,
    state: stateCode,
    zipCode: zipcode,
    country: countryCode,
  };
});

export default mongoose.models.Room || mongoose.model<IRoom>('Room', roomSchema);

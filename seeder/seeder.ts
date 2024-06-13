import { config } from 'dotenv';
import mongoose from 'mongoose';

import Room from '../backend/models/room';
import { rooms } from './data';

config({ path: 'next.config.js' });

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);

    await Room.deleteMany();
    console.log('Rooms deleted');

    await Room.insertMany(rooms);
    console.log('Rooms added');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();

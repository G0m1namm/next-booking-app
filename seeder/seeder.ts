import mongoose from 'mongoose';

import Room from '../backend/models/room';
import User, { IUser } from '../backend/models/user';
import { rooms } from './data';

require('@dotenvx/dotenvx').config()

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log('Connected');

    const testUser = await User.create(
      {
        name: 'testUser',
        email: 'test.booking@email.com',
        password: process.env.TEST_USER_PASSWORD // Add password with number, uppercase, lowercase and special character
      }
    ) as IUser;
    
    const roomsWithUser = rooms.map((room) => {
      room.user = testUser._id;
      return room;
    });

    await Room.deleteMany();
    console.log('Rooms deleted');

    await Room.insertMany(roomsWithUser);
    console.log('Rooms added');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();

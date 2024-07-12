import mongoose from "mongoose";

export const DATABASE = async () => {
  try {
    const database = await mongoose.connect(process.env.DATABASE);
    if (database) {
      console.log("database connected successfully");
    }
  } catch (error) {
    throw error.message;
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL || "");
      console.log("MongoDB connected");  
    } catch (error) {
       console.log(error, "Error while connecting the database"); 
    }
}



/*import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MongoDB connection URI");

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error while connecting the database", error);
    throw error;
  }
};

export default connectDB;*/

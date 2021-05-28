import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.info("Connected to database");
  } catch (e) {
    console.error(`DB connection failed, ${e}`);
  }
};

export default connectDB;

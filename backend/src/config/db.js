
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const connectDb = async function () {

    let client = mongoose.connect(process.env.MONGODB_URL)

    console.log(`connection setup successfuly  ${((await client).connection.host)}`);

}


export { connectDb }
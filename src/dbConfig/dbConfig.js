import mongoose from 'mongoose'
import { Concert_One } from 'next/font/google'

export  async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URL)
    const connection= mongoose.connection
    connection.on('connected',()=>{
        console.log('Mongo Connected Succesfully')
    })
    connection.on('error',(error)=>{
        console.log('Mongo Connected Failed'+error)
        process.exit(1)
    })
  } catch (error) {
    console.log('Something went wrong')
  }
}
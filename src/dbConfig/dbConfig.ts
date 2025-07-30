import mongoose from 'mongoose';    


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log('Connected to MongoDB')
        })

        connection.on('error',(err)=>{
            console.log("error in connection of mongodb make sure databse is up and running error is :"+ err);
            process.exit()
        })

    }catch(err){
        console.log("something went wrong in a connection of the Mongodb");
        console.log(err);
    }
}
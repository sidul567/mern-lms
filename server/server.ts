import {app} from './app';
import connectDB from './utils/db';
import {v2 as cloudinary} from 'cloudinary';
 
// Cloudinary setup
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

// Listening Port
app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on port: ${process.env.PORT}`);
    connectDB();
}) 
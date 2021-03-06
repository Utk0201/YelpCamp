const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//by the below lines, we are associating out account credentials
//credentials with this cloud object
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'YelpCamp', //folder in cloudinary in which things will be stored
        allowedFormats:['jpeg','png','jpg']
    }
  });


//the purpose of this file was to configure the cloudinary object
//with the particular credentials of our account  
module.exports={
      cloudinary,
      storage
  }
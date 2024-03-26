const cloudinary = require('cloudinary')



exports.connectToCloudinary = async (req,res) => {
    try{
        cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
    }catch(err){
        console.log(err);
        res.json({
            msg:"cloudinary connection is failed brother ",
            success:false
        }).status(500)
    }
}
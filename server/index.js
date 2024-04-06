const express = require("express");
const app = express();

const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const courseRoutes = require("./routes/Course")
const paymentRoutes = require("./routes/Payment")

const cookieParser = require("cookie-parser")
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {connectToCloudinary} = require("./config/cloudinary")






//database connection
require("./config/database").connectwithDB();
//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(
	cors({
		origin:"https://education-mern-web-l75k.vercel.app",
		credentials:true,
	})
);


const PORT = process.env.PORT || 4000;

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//CLOUDINARY CONNECTION BROTHER 
connectToCloudinary();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment", paymentRoutes);





//default route 
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
app.listen(PORT,()=>{
    console.log("The surver is running well brother 🐻‍❄️ ...");
});

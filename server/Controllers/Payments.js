const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const crypto = require("crypto");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/courseProgress");

//initiate the razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses?.length === 0) {
    return res.json({ success: false, message: "Please provide Course Id" });
  }

  let totalAmount = 0;
  console.log("courses", courses);
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the course" });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (course.StudentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }

      totalAmount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  const currency = "INR";
  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, mesage: "Could not Initiate Order" });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  // validation
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !userId ||
    !courses
  ) {
    return res
      .json({
        success: false,
        message: "Payment is Failed brother",
      })
      .status(400);
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // enrolled the student
    await enrollStudents(courses, userId, res);
    // return response
    return res
      .json({
        success: true,
        message: "Payment Verified brother",
      })
      .status(200);
  }
  return res.status(400).json({ message: "Payment Failed", success: false });
};

const enrollStudents = async (courses, userId, res) => {
  // validaitons
  if (!courses || !userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please Provide data for Courses or UserId",
      });
  }

  for (const courseId of courses) {
    try {
      // find the course and enrolled the student
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: { StudentsEnrolled: userId },
        },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: "Course not Found" });
      }


     const courseProgress = await CourseProgress.create({
      courseId:courseId,
      userId:userId,
      completedVideos:[]
     });


      // findd the student and update the course array or field
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { 
            courses: courseId,
            courseProgress:courseProgress._id,
          },
        },
        { new: true }
      );

      if (!enrolledStudent) {
        return res.status(500).json({
          message: "student not found",
          success: false,
        });
      }

      // mail send kr do ab apne  bche ko
      const emailResponse = await mailSender(
        enrolledStudent.email,
        ` Successfully Enrolled into ${enrolledCourse?.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse?.courseName,
          `${enrolledStudent?.firstName}`
        )
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  console.log("i am in the funtion of main send back");
  console.log("user id is ", userId);
  console.log("user id is orderId", orderId);
  console.log("user id is paymentId", paymentId);
  console.log("user id isamount", amount);

  if (!orderId || !paymentId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields ",
    });
  }

  try {
    // student ko find kro
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not send email" });
  }
};

// //capture the payment and initiate the razorpay order
// exports.capturePayment = async (req,res)=>{
//     try{
//          //get cpurse id and user id
//           const {course_id} = req.body;
//           const userId = req.user.id;
//           //validation
//           //valid course
//           if(!course_id){
//             return res.json({
//                   success:false,
//                   msg:"please povide a valid course id "
//             })

//           }
//           //valid courseDetails
//           let course = await Course.findById(course_id);
//           if(!course){
//             return res.json({
//                 success:false,
//                 msg:"could not find the course brother..."
//             })
//           }
//           //user already pay for the same course
//           const uid = new mongoose.Types.ObjectId(userId);
//           if(course.StudentsEnrolled.includes(uid)){
//             return res.json({
//                 msg:"Student is already enrolled",
//                 success:false
//             }).status(500)
//           }
//         //Order create
//         const amount = course.price;
//         const currency = "INR";
//         const options ={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId,
//             }
//         };
//         try{
//                //initiate the payment using razorpay
//                const paymentResponse = await instance.orders.create(options);
//                console.log("paymentresponse",paymentResponse);

//         }catch(err){
//                console.log(err);
//                return res.json({
//                 success:false,
//                 msg:"could not initiate the payment"
//                });
//         }

//         //return response
//         res.json({
//             success:true,
//             coursename:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderid: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//             msg:"payment capture is successfull by razorpay plateform brother.."
//         }).status(200)
//     }catch(err){
//         console.log(err);
//         res.json({
//             success:false,
//             msg:"something went wrong in capture the payment process"
//         }).status(500)
//     }
// }

// //verify signature
// exports.verifySignature =async(req,res)=>{
// const webhookSecret = "12345678";

// const signature = req.headers["x-razorpay-signature"];

// const shasum = crypto.createHmac("sha256",webhookSecret);
// shasum.update(JSON.stringify(req.body));
// const digest = shasum.digest("hex");

// if(signature == digest){
//     console.log("payment is authorized");
//     const {courseId,userId}= req.body.payload.payment.entity.notes;
//     try{
//           //fulfill the action
//           //find the course and enrolled student in it
//           const enrolledCourse =  await Course.findOneAndUpdate({_id:courseId},{
//             $push:{
//                 StudentsEnrolled:userId,
//             }
//           },{new:true});

//           if(!enrolledCourse){
//             res.json({
//                 success:false,
//                 msg:"course not found"
//             }).status(500);
//           }
//           console.log(enrolledCourse);
//           //now find the student schema and update the course section of it brother
//           const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
//             $push:{
//                 courses:courseId,
//             }
//           },{new:true});
//           if(!enrolledStudent){
//             return res.json({
//                 success:false,
//                 msg:"user not found"
//             }).status(500);
//           }
//           console.log(enrolledStudent);

//           //mail send krna hai
//           const emailResponse = await mailSender(
//             enrolledStudent.email,
//             "Congratulation from vidhcode",
//             "Congratulation , You are  onboarded into new vidhcode course",
//           );
//           console.log(emailResponse);
//           return res.json({
//             success:true,
//             msg:"Signature verified and course added"
//           }).status(200);
//     }catch(err){
//           console.log(err);
//           res.json({
//             success:false,
//             msg:err.message,
//           }).status(500)
//     }
// }

// else{
//     res.json({
//         success:false,
//         msg:"Invalid request.."
//     }).status(400)
// }

// }

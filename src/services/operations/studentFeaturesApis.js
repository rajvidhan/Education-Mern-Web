import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../Apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/CartSlice";
const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;

// ye documentation me jo script add kr rhi hai usi k jesa kam krti hai 
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}



export async function buyCourse(token,courses,userDetails,navigate,dispatch){
 const toastId = toast.loading("Loading...")
 try{
    // step 1 :-load the script or script hm layenge as always razorpay documentations se 
    
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
    if(!res){
        toast.error("Razorpay SDK failed to load")
        return;
    }

    
    // order ko initialized krna hai 
    const orderResponse =  await apiConnector("POST", COURSE_PAYMENT_API, 
    {courses},
    {   
        
        Authorization: `Bearer ${token}`,
    });
   
       console.log("first to orderresponse ",orderResponse)
    if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message)
    }


    // options create krenge aab 

const RAZORPAY_KEY = "rzp_test_GwaM1DlxMtfkbg"

    const options = {
        key:RAZORPAY_KEY,
        currency:orderResponse.data.message.currency,
        amount:`${orderResponse?.data?.message?.amount}`,
        order_id:orderResponse.data.message.id,
        name:"VidhStudy",
        description:"Thank you for Purchasing the Course",
        image:rzpLogo,  
        prefill:{
           name:`${userDetails.firstName}`,
           email:userDetails.email
        },
        handler: function(response){
            console.log("in student api", response);
            // send success mail 
            sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token)

            // verify the payment 
            verifyPayment({...response,courses},token,navigate,dispatch)

        }
    }

    const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log("response of window ", response);
        })

 }catch(error){
   console.log(error.message)
   toast.error(error.message)
 }
 toast.dismiss(toastId)
}



async function sendPaymentSuccessEmail(response,amount,token){
    try{
        

   const resul1 =  await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
        orderId:response.razorpay_order_id,
        paymentId:response.razorpay_payment_id,
        amount
    },{ 
        Authorization: `Bearer ${token}`
    })
  
    }catch(error){ 
      console.log("payment success email error..")
    }
}


async function verifyPayment( bodyData,token , navigate,dispatch){
    const toastId = toast.loading("Verifing Payment....😊");
    dispatch(setPaymentLoading(true));
    try{

       const response = await apiConnector("POST",COURSE_VERIFY_API
       ,bodyData,{
       
        Authorization:`Bearer ${token}`
       })

   if(!response.data.success){
    throw new Error(response.data.message)
   }

   toast.success("Payment Successfull🤗,You are added in the course🤗");
   navigate("/dashboard/enrolled-courses")
   dispatch(resetCart());

       
    }
    catch(error){
        console.log(error.message);
        toast.error("could not verify payment")
    }
    toast.dismiss(toastId);
   dispatch(setPaymentLoading(false));
}
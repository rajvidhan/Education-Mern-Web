import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';




const AdminVerify = () => {

    const [code,setCode] = useState("");
    const navigate = useNavigate();

    const handlechange = (e)=>{
      setCode(
        [e.target.name]=e.target.value,
      )
    }

    const handleclick =(e)=>{
        e.preventDefault();

        if(code !== "Vidhan123"){
            alert("not match")
        }else{
            navigate("/admin/admin-portal")
        }

    }


  return (
   <>
    <div className=' flex flex-col mt-[120px]  justify-center items-center'>
        <div className='text-richblack-100 text-[100px] '>
            <p>Hi..dude👋 </p>
        </div>
     <p className='text-richblack-100 text-[60px]' >If you are an admin??..then please enter the secret code 🤫  </p>
     <input type="password"
     onChange={handlechange}
     name="code"
     value={code}
     style={{
         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
       }}
       className="w-[50%] mt-10 rounded-[0.5rem] bg-black p-[20px] text-richblack-5"
      placeholder='Enter the code..'
     />
     <button onClick={handleclick} className='p-4 hover:border-[4px] hover:border-white bg-yellow-200 mt-10 w-20 h-20  text-black rounded-full'>Verify</button>
    </div>
    
   </>
  )
}

export default AdminVerify

"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);
  // ১. নতুন স্টেট: লোডিং বোঝানোর জন্য
  const [isLoading, setIsLoading] = useState(false); 

  const handleRegisterFunc = async (data) => {
    // ২. বাটন ক্লিক করলেই লোডিং শুরু হবে
    setIsLoading(true); 
    
    const { email, name, photo, password } = data; 
    
    // API কল
    const { data: res, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      image: photo,
      callbackURL: "/",
    });

    // ৩. রেসপন্স আসার পর লোডিং বন্ধ করে দেব
    setIsLoading(false); 

    if (error) {
      // ৪. Undefined সমস্যা সমাধানের জন্য অপশনাল চেইনিং (?) এবং ডিফল্ট মেসেজ
      alert(error?.message || "Registration failed! Please try again.");
      console.log("Full Error Object:", error); // কনসোলে আসল এরর দেখার জন্য
      // alert(error.message); // এরর মেসেজ দেখানোর জন্য
    } 
    
    if (res) {
      alert("Signup successful");
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
      <div className="p-4 rounded-xl bg-white w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">
          Register your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegisterFunc)}>
          {/* ... আপনার আগের সব ইনপুট ফিল্ড ঠিক একই থাকবে ... */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here name"
              {...register("name", { required: "Name field is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </fieldset>

          {/* Email, Photo, Password ফিল্ডগুলো আপনার আগের কোডের মতোই রাখুন */}
          
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input"
              placeholder="Type here email"
              {...register("email", { required: "Email field is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </fieldset>

          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input"
              placeholder="Type here password"
              {...register("password", { required: "Password field is required" })}
            />
            <span
              className="absolute right-3 top-4 cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </fieldset>

          {/* ৫. বাটন আপডেট: লোডিং অবস্থায় বাটন ডিজেবল থাকবে এবং লেখা পরিবর্তন হবে */}
          <button 
            className="btn w-full bg-slate-800 text-white flex justify-center items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;











// "use client";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const RegisterPage = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const [isShowPassword, setIsShowPassword] = useState(false);

//   const handleRegisterFunc = async (data) => {
//     console.log(data, "data");
//     const { email, name, photo, password } = data;  //  we are destructuring the data object to get the email, name, photo, and password values that the user has entered in the registration form. This allows us to easily access these values when we need to use them for the registration process.

//     // we receive those using react hook form --using those steps -- we have to register the input fields in the form with the "register" function from react-hook-form and then we can access the values of those fields in the handleRegisterFunc function through the data object that is passed as an argument to this function. We can then destructure this data object to get the individual values like email, name, photo, and password that the user has entered in the registration form.
//     console.log(name, photo);
// //------------------Extra code (from login page ) for register page... for signup  ------------------------------------------ 
//     const { data: res, error } = await authClient.signUp.email({
//       name: name, // required
//       email: email, // required
//       password: password, // required
//       image: photo,
//       callbackURL: "/",
//     });

//     console.log(res, error);
//     if (error) {
//       alert(error.message);
//     }

//     if (res) {
//       alert("Signup successful");
//     }
//   };

//   return (
//     <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
//       <div className="p-4 rounded-xl bg-white">
//         <h2 className="font-bold text-3xl text-center mb-6">
//           Register your account
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit(handleRegisterFunc)}>
//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Name</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="Type here name"
//               {...register("name", {
//                 required: "Name field is required",
//               })}
//             />
//             {errors.name && (
//               <p className="text-red-500">{errors.name.message}</p>
//             )}
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Photo URL</legend>
//             <input
//               type="text"
//               className="input"
//               placeholder="Type here photo url"
//               {...register("photo", {
//                 required: "Photo URL field is required",
//               })}
//             />
//             {errors.photo && (
//               <p className="text-red-500">{errors.photo.message}</p>
//             )}
//           </fieldset>

//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Email</legend>
//             <input
//               type="email"
//               className="input"
//               placeholder="Type here email"
//               {...register("email", {
//                 required: "Email field is required",
//               })}
//             />
//             {errors.email && (
//               <p className="text-red-500">{errors.email.message}</p>
//             )}
//           </fieldset>

//           <fieldset className="fieldset relative">
//             <legend className="fieldset-legend">Password</legend>
//             <input
//               type={isShowPassword ? "text" : "password"}
//               className="input"
//               placeholder="Type here password"
//               {...register("password", {
//                 required: "Password field is required",
//               })}
//             />
//             <span
//               className="absolute right-8 top-4 cursor-pointer"
//               onClick={() => setIsShowPassword(!isShowPassword)}
//             >
//               {isShowPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//           </fieldset>

//           <button className="btn w-full bg-slate-800 text-white">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

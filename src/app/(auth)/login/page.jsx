

"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  // --- react-hook-form থেকে ফর্ম ম্যানেজমেন্টের টুলস নেওয়া হচ্ছে ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // --- স্টেট ম্যানেজমেন্ট (State Management) ---
  const [isShowPassword, setIsShowPassword] = useState(false); // পাসওয়ার্ড দেখানো/লুকানোর জন্য
  const [isLoading, setIsLoading] = useState(false); // সাবমিট করার সময় লোডিং স্পিনার বা বাটন ডিজেবল করার জন্য

  // --- লগইন হ্যান্ডলার ফাংশন (Login Handler Function) ---
  const handleLoginFunc = async (data) => {
    console.log("Form Data Submitted:", data);
    
    setIsLoading(true); // ১. সাবমিট শুরু হওয়া মাত্রই লোডিং ট্রু (True) করে দেওয়া হলো

    try {
      // ২. authClient এর মাধ্যমে সার্ভারে ডাটা পাঠানো হচ্ছে
      const { data: res, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/",
      });

      console.log("Server Response:", res, error);

      // ৩. যদি সার্ভার থেকে কোনো এরর আসে
      if (error) {
        alert(error.message || "An error occurred during sign in.");
        return; // এরর আসলে এখানেই ফাংশন থামিয়ে দেওয়া হলো
      }

      // ৪. যদি রেসপন্স সফল (Success) হয়
      if (res) {
        alert("Signin successful!");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // ৫. কাজ সফল হোক বা এরর আসুক, শেষে লোডিং ফলস (False) হয়ে যাবে
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
      <div className="p-6 rounded-xl bg-white shadow-md w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">
          Login your account
        </h2>

        {/* --- ফর্ম স্টার্ট --- */}
        <form className="space-y-4" onSubmit={handleSubmit(handleLoginFunc)}>
          
          {/* Email Field */}
          <fieldset className="fieldset flex flex-col gap-1">
            <legend className="fieldset-legend font-medium text-sm text-slate-700">Email</legend>
            <input
              type="email"
              className="input p-2 border border-slate-300 rounded-md focus:outline-slate-500"
              placeholder="Type here email"
              {...register("email", {
                required: "Email field is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </fieldset>

          {/* Password Field */}
          <fieldset className="fieldset flex flex-col gap-1 relative">
            <legend className="fieldset-legend font-medium text-sm text-slate-700">Password</legend>
            <div className="relative w-full">
              <input
                type={isShowPassword ? "text" : "password"} // কন্ডিশনাল টাইপ টগল
                className="input w-full p-2 pr-10 border border-slate-300 rounded-md focus:outline-slate-500"
                placeholder="Type here password"
                {...register("password", {
                  required: "Password field is required",
                })}
              />
              {/* চোখ আইকন বাটন - টাইপ 'button' দেওয়া হয়েছে যাতে এটি ফর্ম সাবমিট না করে দেয় */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </fieldset>

          {/* Login Button with Loading State */}
          <button 
            type="submit" 
            disabled={isLoading} // লোডিং অবস্থায় বাটনটি ডিজেবল থাকবে যেন ইউজার বারবার ক্লিক করতে না পারে
            className="btn w-full py-2 bg-slate-800 text-white rounded-md font-medium hover:bg-slate-900 transition-colors disabled:bg-slate-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration Link */}
        <p className="mt-4 text-sm text-center text-slate-600">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

// "use client";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const LoginPage = () => {

//   // ---  useForm হুক থেকে প্রয়োজনীয় ফাংশন ও স্টেট বের করা হচ্ছে...  ---
//   // ( a hook from react-hook-form library that helps in managing form state and validation. It provides functions like register, handleSubmit, watch, and an object for formState which contains errors. )
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const [isShowPassword, setIsShowPassword] = useState(false);  
//   // ---  this state variable is used to toggle the visibility of the password input field. when isShowPassword is true, the password will be shown in plain text, and when it is false, the password will be hidden (shown as dots or asterisks). the setIsShowPassword function is used to update this state variable when the user clicks on the eye icon to show or hide the password. ---

//   const [isLoading, setIsLoading] = useState(false); // --- this state variable is used to indicate whether the login process is currently in progress. when the user submits the login form, we can set isLoading to true to show a loading spinner or disable the login button to prevent multiple submissions. once the login process is complete (either successful or with an error), we can set isLoading back to false. ---

//   // ---  this function will handle the login logic when the form is submitted. It takes the form data as an argument, sends it to the authentication client, and handles the response accordingly. ---
//   const handleLoginFunc = async (data) => {
//     console.log(data, "data");


//     //---from handleLoginFunc function we are destructuring the data object to get the email and password values that the user has entered in the login form. This allows us to easily access these values when we need to use them for the login process.---
//     //-- onSubmit that time we call the --handleSubmit function from react-hook-form and we pass our handleLoginFunc function to it. so when the form is submitted, react-hook-form will first validate the form data and then call our handleLoginFunc function with the validated data as an argument. inside the handleLoginFunc function, we can access the email and password values that the user has entered in the form through the data object that is passed as an argument to this function. we can then destructure this data object to get the individual values like email and password that the user has entered in the login form.---
//     const { data: res, error } = await authClient.signIn.email({  //   data: res  --we just rename the data to res for better understanding.. (js concept for renaming while destructuring an object -- we can rename the variable while destructuring an object by using the syntax: const { originalName: newName } = object;  here, we are renaming the data variable to res for better readability and understanding of the code. This way, when we see res in the code, we know that it is the response from the signIn function, which makes it clearer than just using data.) 

//     // and error will be the error that we get from the server if there is any error during the login process.
//       email: data.email, // required
//       password: data.password, // required
//       rememberMe: true,
//       callbackURL: "/",
//     });

//     console.log(res, error);
// // ---  error is a object that get from -- authClient.signIn.email() function if there is any error during the login process. and we are checking if there is any error, then we will show an alert with the error message. and we are also logging the full error object to the console for debugging purposes. ---
//      if (error) {
//        // ১. এরর মেসেজ দেখানোর জন্য alert ব্যবহার করা হচ্ছে। 
//     if (error) {
//       alert(error.message);   // in error object have a property called message, which contains the error message that we want to show to the user. so we are using alert(error.message) to display that message in an alert box on the screen.
//     }
    

//     if (res) {  // after await for some moment we get the response from the server --in res variable..  and we are checking if we get the response, then we will show an alert with the message "Signin successful".--Otherwise we will get ---> an error message from the server and we will show that error message in an alert box on the screen.
//       alert("Signin successful");
//     }
//   } ;

//   return (
//     <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
//       <div className="p-4 rounded-xl bg-white">
//         <h2 className="font-bold text-3xl text-center mb-6">
//           Login your account
//         </h2>
// {/* ------------------------------------------------------------------------- */}
//         <form className="space-y-4" onSubmit={handleSubmit(handleLoginFunc)}>
//            {/* -------in handleSubmit function we call --handleLoginfunc call..  */}
//           {/*    /* "handleSubmit" will validate your inputs before invoking "onSubmit"--handleLoginFunc   here,   (instead of  onsubmit..  )  */}
//           {/* -----------Everything will be here for the login form in the form tag...  */}
//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Email</legend>
//             <input
//               type="email"
//               className="input"
//               placeholder="Type here email"
//               //  register your input into the hook by invoking the "register" function with the field name and validation rules.
//               {...register("email", {
//                 required: "Email field is required",
//               })}
//             />
//             {errors.email && (
//               <p className="text-red-500">{errors.email.message}</p>
//             )}
//           </fieldset>
//           {/* -----------Password field with show/hide toggle...  */}
//           <fieldset className="fieldset relative">
//             <legend className="fieldset-legend">Password</legend>
//             {/* ----------------------syntax following -- react-hook-form */}
//             <input
//               type={isShowPassword ? "text" : "password"}     //  ---> conditional rendering for showing or hiding the password based on the value of isShowPassword state variable. if isshowpassword is true , the intput type will be text else it wil be password.. .....   for toggle below we create a button for this --->  depend on onclick it will toggle values.. 
//               className="input"
//               placeholder="Type here password"
//               {...register("password", {
//                 required: "Password field is required",
//               })}
//             />
//             {/* --------------the eye icon for showing/hiding password ... Faeys is for show .. FaEyeSlash for hide password  ..------ */}
//             <span
//               className="absolute right-2 top-4 cursor-pointer"
//               onClick={() => setIsShowPassword(!isShowPassword)}
//             >
//               {isShowPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//             {/* -------------------------------- */}
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//           </fieldset>

//           <button className="btn w-full bg-slate-800 text-white">Login</button>
//         </form>

//         <p className="mt-4">
//           Dont have an account?{" "}

//           {/* -----------Link to the registration page...  when don't have an accoun means don't register yet.. t */}
//           <Link href={"/register"} className="text-blue-500">       // REDIRECT TO THE 
//             Register PAGE .. 
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// ;

// export default LoginPage;


// // /*
// // আপনার দেওয়া LoginPage কোডটি একটি স্ট্যান্ডার্ড রিঅ্যাক্ট (React) বা নেক্সট জেএস (Next.js) কম্পোনেন্টের স্ট্রাকচার। একটি পেজে মূলত তিনটি প্রধান অংশ থাকে। আপনার কোডটি ধাপে ধাপে বিশ্লেষণ করলে বিষয়টি পরিষ্কার হবে:১. কম্পোনেন্ট বডি (Function Logic Part)কোথায়: const LoginPage = () => { থেকে return ( এর আগ পর্যন্ত।এখানে কী হয়: এখানে আমরা যাবতীয় "বুদ্ধি" বা Logic সেট করি।State Management: যেমন আপনি useState(false) ব্যবহার করেছেন পাসওয়ার্ড দেখানো বা লুকানোর জন্য।Hooks Initialization: ফর্ম হ্যান্ডেল করার জন্য useForm() হুকটি কল করেছেন।Action Functions: handleLoginFunc এর মতো ফাংশনগুলো এখানে তৈরি করা হয়। এই ফাংশনটি সার্ভারে ডাটা পাঠানো বা এপিআই (API) কল করার কাজ করে।সহজ কথায়: এখানে আপনি সব সরঞ্জাম (Tools) রেডি করেন। কিন্তু এগুলো নিজে নিজে কাজ শুরু করে না, এগুলো বসে থাকে কখন ইউজার ক্লিক করবে তার অপেক্ষায়।২. রিটার্ন অংশ (The UI/View Part)কোথায়: return ( এর ভেতর থেকে শেষ পর্যন্ত।এখানে কী হয়: এখানে আপনি বলে দেন ব্রাউজারে ইউজার কী দেখবে। অর্থাৎ আপনার HTML/JSX।Visual Layout: এখানে কার্ড, ইনপুট বক্স, বাটন এগুলো সাজানো থাকে।Mapping functionality: আগের অংশে তৈরি করা লজিকগুলোকে এখানে HTML এলিমেন্টের সাথে জুড়ে দেওয়া হয়। যেমন: onSubmit={handleSubmit(handleLoginFunc)}।সহজ কথায়: এটি হলো আপনার দোকানের "ডিসপ্লে"। এখানে বাটন আছে, কিন্তু বাটনের কাজ কী সেটা আগেই লজিক পার্টে লেখা হয়েছে।৩. ধাপে ধাপে কাজের প্রক্রিয়া (Step-by-Step Flow)আপনার এই নির্দিষ্ট কোডটি যেভাবে কাজ করছে:ধাপ ১: ডাটা কালেকশন (Before Return)JavaScriptconst { register, handleSubmit, ... } = useForm();
// // এখানে আপনি ফর্মের ডাটা ধরার জন্য সিস্টেম রেডি করলেন। register দিয়ে ইনপুট ফিল্ডকে ট্র্যাক করবেন।ধাপ ২: প্রসেসিং লজিক (The Function)JavaScriptconst handleLoginFunc = async (data) => {
// //     // ১. ফর্ম থেকে ইমেইল ও পাসওয়ার্ড নিল
// //     // ২. authClient এর মাধ্যমে সার্ভারে পাঠাল (Authentication)
// //     // ৩. রেজাল্ট চেক করল (res বা error)
// //     // ৪. সাকসেস বা এরর মেসেজ দেখাল
// // };
// // এটি একটি Asynchronous কাজ। ইউজার বাটনে ক্লিক করলে তবেই এই লজিকটি রান করবে।ধাপ ৩: ইউজার ইন্টারফেস ও বাইন্ডিং (Inside Return)এখানে আপনি রিঅ্যাক্টকে বলছেন কীভাবে লজিক ও ডিজাইন কানেক্ট হবে:ইনপুট বাইন্ডিং: {...register("email")} এর মাধ্যমে আপনি ইনপুট বক্সের ডাটাকে useForm এর সাথে কানেক্ট করলেন।ইভেন্ট হ্যান্ডলিং: onClick={() => setIsShowPassword(!isShowPassword)}। এখানে ইউজার ক্লিক করলে রিঅ্যাক্ট উপরের স্টেটে গিয়ে ভ্যালু চেঞ্জ করে দেয়।কন্ডিশনাল রেন্ডারিং: isShowPassword ? "text" : "password"। উপরের স্টেট অনুযায়ী ইনপুটের টাইপ বদলে যাচ্ছে।ফর্ম সাবমিট: যখন ইউজার "Login" বাটনে ক্লিক করে, তখন handleSubmit আপনার তৈরি করা handleLoginFunc কে কল করে দেয়।৪. সারসংক্ষেপ (Summary Table)অংশকাজআপনার কোড থেকে উদাহরণSetup (Before Return)ভেরিয়েবল, স্টেট এবং ফাংশন তৈরি করা।useState, handleLoginFuncLogic (Before Return)ডেটা প্রসেসিং এবং API কল করা।authClient.signIn.email(...)Rendering (In Return)UI দেখানো এবং ইভেন্ট কানেক্ট করা।<form>, <input>, onSubmitFeedback (In Logic)কাজ শেষে ইউজারকে রেজাল্ট জানানো।alert("Signin successful")একটি টিপস: সবসময় চেষ্টা করবেন সব বড় বড় লজিক বা ক্যালকুলেশন return এর আগে সেরে ফেলতে। return এর ভেতরটা যেন যতটা সম্ভব পরিষ্কার থাকে এবং শুধুমাত্র UI দেখানোর কাজ করে। আপনার কোডে এটি খুব সুন্দরভাবে মেইনটেইন করা হয়েছে!আপনার কি মনে হয় এই ফর্মটিতে এখন একটি Loading Spinner যোগ করা দরকার যাতে ইউজার বোঝে যে লগইন হচ্ছে? **/
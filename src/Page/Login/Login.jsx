import React from "react";
import { FcGoogle } from "react-icons/fc";
import { centerXY, input, transition } from "../../components/tailwindClass";

const Login = () => {
  return (
    // * main container * //
    <section className={`bg-[#E5E5E5] min-h-screen ${centerXY} md:p-0 p-5`}>
      {/* Card */}
      <div className="bg-[#F0F2F5] p-10 rounded-lg">
        <h1 className="text-3xl font-semibold capitalize text-center mb-3">
          Get started with Ponditi Overflow
        </h1>
        <p className="text-center text-[#B7B8B9] text-lg mb-10 font-semibold">
          Getting started is easy
        </p>
        {/* button for login with google */}
        <button
          className={`bg-[#FFFFFF] p-3 rounded-lg border-2  gap-3 mx-auto ${centerXY} hover:scale-105 hover:border-[#20DC49] ${transition}`}
        >
          <FcGoogle /> Google
        </button>
        {/* separator */}
        <div className={`${centerXY} mt-5 gap-5`}>
          <div className="h-[2px] w-[30%] bg-black">&nbsp;</div>
          <div className="">OR</div>
          <div className="h-[2px] w-[30%] bg-black">&nbsp;</div>
        </div>
        {/* login form */}
        <form className="w-[70%] block mx-auto mt-10">
          <input type="text" className={`${input} mb-5`} placeholder="Email" />
          <input type="password" className={`${input}`} placeholder="Password" />
          <button
            className={`w-full rounded-lg border-2 border-[#555] block mt-10 text-[#555] p-3 hover:scale-105 ${transition}`}
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

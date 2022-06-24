import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <section className="bg-[#E5E5E5] min-h-screen flex justify-center items-center">
      <div className="bg-[#F0F2F5] p-5 rounded-lg">
        <h1 className="text-3xl font-semibold capitalize text-center mb-3">
          Get started with Ponditi Overflow
        </h1>
        <p className="text-center text-[#B7B8B9] text-lg mb-10 font-semibold">
          Getting started is easy
        </p>
        <button className="bg-[#FFFFFF] p-3 rounded-lg flex items-center justify-center gap-3 mx-auto">
          <FcGoogle /> Google
        </button>
        <div className="">
          <div className="">&nbsp;</div>
          <div className="">OR</div>
          <div className="">&nbsp;</div>
        </div>
      </div>
    </section>
  );
};

export default Login;

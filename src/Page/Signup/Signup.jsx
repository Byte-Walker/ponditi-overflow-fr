import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

const Signup = () => {
  const path = useNavigate();
  return (
    // * main container * //
    <section className={`md:bg-blue-50 bg-white min-h-screen centerXY md:p-0`}>
      {/* Card */}
      <div className="max-w-[500px] bg-white md:border md:border-blue-200 px-10 py-20 rounded md:shadow">
        <p className="text-center text-gray-400 text-lg mb-2 font-semibold">Hello New Pondit 👋</p>
        <h1 className="text-3xl font-semibold capitalize text-center mb-5">Create Your Account</h1>
        {/* login form */}
        <form className="mt-10">
          <input
            type="text"
            name="name"
            className={`input mb-5`}
            placeholder="Please enter your Name"
            required
          />
          <input
            type="email"
            name="email"
            className={`input mb-5`}
            placeholder="Please enter your Email"
            required
          />
          <input
            type="password"
            name="passwword"
            className={`input`}
            placeholder="Please enter your Password"
            required
          />
          <button
            className={`w-full rounded block mt-10 bg-blue-600 text-white p-3 hover:scale-105 transition`}
          >
            Log In
          </button>
        </form>
        {/* separator */}
        <div className={`centerXY my-8 gap-2`}>
          <div className="h-[2px] w-full bg-gray-300">&nbsp;</div>
          <div className="text-gray-400 whitespace-nowrap">Or Continue With</div>
          <div className="h-[2px] w-full bg-gray-300">&nbsp;</div>
        </div>
        {/* Social Login */}
        <div className="flex justify-center gap-5 mx-auto w-full">
          <button
            className={`bg-white p-3 rounded-lg border gap-3 centerXY hover:scale-105 hover:border-red-500 transition`}
          >
            <FcGoogle /> Google
          </button>
          <button
            className={`bg-white p-3 rounded-lg border gap-3 centerXY hover:scale-105 hover:border-blue-500 transition`}
          >
            <BsFacebook className="text-blue-600" /> Facebook
          </button>
        </div>
        <p className="mt-10 text-center text-gray-500">
          Don't Have an Account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer underline"
            onClick={() => {
              path("/");
            }}
          >
            Register Here!
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;

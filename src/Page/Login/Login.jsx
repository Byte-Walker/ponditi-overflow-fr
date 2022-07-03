import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social_Login/GoogleLogin";
import GithubLogin from "../../components/Social_Login/GithubLogin";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../../components/firebase.init";
import Modal from "../../components/Modal/Modal";
import { toastConfig } from "../../components/toastConfig";
import { toast } from "react-toastify";

const Login = () => {
  const path = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, veryficationError] = useSendPasswordResetEmail(auth);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error.code, toastConfig);
    } else if (user) {
      path("/");
    } else if (veryficationError) {
      toast.error(veryficationError.code, toastConfig);
    }
  }, [error, user, veryficationError]);
  // * handeling login * //
  const loginHandler = (event) => {
    event.preventDefault();
    const user_email = event.target.elements.email.value;
    const user_pass = event.target.elements.password.value;
    // * logging in into user account * //
    signInWithEmailAndPassword(user_email, user_pass);
    event.target.reset();
  };
  // * handeling forget password * //
  const forgetPassword = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    await sendPasswordResetEmail(email);
    setOpenModal(false);
    toast.success("Veryfication Email has been sent", toastConfig);
  };
  return (
    // * main container * //
    <section className={`md:bg-blue-50 bg-white min-h-screen centerXY md:p-0`}>
      {/* Card */}
      <div className="max-w-[500px] bg-white md:border md:border-blue-200 px-14 py-16 rounded md:shadow">
        <p className="text-center text-gray-400 text-lg mb-2 font-semibold">Welcome back 👋</p>
        <h1 className="text-3xl font-semibold capitalize text-center mb-5">
          Login to your account
        </h1>
        {/* login form */}
        <form className="mt-10" onSubmit={loginHandler}>
          <input
            type="email"
            name="email"
            className={`input mb-5`}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            className={`input`}
            placeholder="Password"
            required
          />
          {/* password reset */}
          <p
            className="my-5 text-right underline cursor-pointer text-red-600"
            onClick={() => setOpenModal(true)}
          >
            Forget Password?
          </p>
          <button
            className={`w-full rounded block  text-white p-3 hover:scale-105 transition`}
            disabled={loading}
            style={{ backgroundColor: loading ? "#9BA3AF" : "#DC2626" }}
          >
            {loading ? "Loading" : "Log In"}
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
          <GoogleLogin />
          <GithubLogin />
        </div>
        <p className="mt-10 text-center text-gray-500">
          Don't Have an Account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer underline"
            onClick={() => {
              path("/signup");
            }}
          >
            Register Here!
          </span>
        </p>
      </div>
      <Modal openModal={openModal} setOpenModal={setOpenModal} title={"Password Reset?😓"}>
        <form className="p-5" onSubmit={forgetPassword}>
          <input type="email" name="email" className="input" placeholder="Your Email" required />
          <button
            className="btn-red mt-5"
            disabled={sending}
            style={{ backgroundColor: sending ? "#9BA3AF" : "#DC2626" }}
          >
            Reset
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social_Login/GoogleLogin";
import GithubLogin from "../../components/Social_Login/GithubLogin";
import Modal from "../../components/Modal/Modal";
import { toastConfig } from "../../components/toastConfig";
import { toast } from "react-toastify";
import { UserContext } from "../../ContextAPI/UserContext";

const Login = () => {
  const path = useNavigate();
  const { manageUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  // * handeling login * //
  const loginHandler = (event) => {
    event.preventDefault();
    const user_email = event.target.elements.email.value;
    const user_pass = event.target.elements.password.value;
    const loginInfo = { user_email, user_pass };
    // * logging in into user account * //
    const url = `https://ponditi-overflow.herokuapp.com/login`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          manageUser(user);
          localStorage.setItem("userInfo", JSON.stringify(user));
          path("/");
        } else {
          toast.error("Error Occured", toastConfig);
        }
      });

    // event.target.reset();
  };
  // * handeling forget password * //
  const forgetPassword = async (event) => {};
  return (
    // * main container * //
    <section className={`md:bg-gray-50 bg-white min-h-screen centerXY md:p-0`}>
      {/* Card */}
      <div className="max-w-[500px] bg-white md:border md:border-gray-200 px-14 py-16 rounded md:shadow">
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
          <button
            className={`w-full rounded block bg-blue-600 text-white p-3 hover:scale-105 transition mt-10`}
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
          <button className="btn-red mt-5" style={{ backgroundColor: "#DC2626" }}>
            Reset
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Login;

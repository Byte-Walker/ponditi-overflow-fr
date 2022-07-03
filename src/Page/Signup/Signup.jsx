import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social_Login/GoogleLogin";
import GithubLogin from "../../components/Social_Login/GithubLogin";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import auth from "../../components/firebase.init";

const Signup = () => {
  const path = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, , updateError] = useUpdateProfile(auth);
  const [sendEmailVerification, , varificationError] = useSendEmailVerification(auth);
  // * handling signup * //
  useEffect(() => {
    if (error) {
      alert(error.code);
    } else if (updateError) {
      alert(updateError.code);
    } else if (varificationError) {
      alert(varificationError);
    } else if (user) {
      console.log(user);
      path("/");
    }
  }, [error, user, path, updateError, varificationError]);

  const singupHandler = (event) => {
    event.preventDefault();
    const name = event.target.elements.firstName.value + " " + event.target.elements.lastName.value;
    const user_email = event.target.elements.email.value;
    const user_pass = event.target.elements.password.value;
    const img_url = null;

    // * stroring all data to a object * //
    const userInfo = { name, user_email, user_pass, img_url };
    createUserWithEmailAndPassword(user_email, user_pass)
      .then(() => updateProfile({ displayName: name }))
      .then(() => sendEmailVerification());

    const url = `http://localhost:5500/signup`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          alert("Account Created");
          event.target.reset();
        }
      });
    // * sending data to api * //
  };
  return (
    // * main container * //
    <section className={`md:bg-blue-50 bg-white min-h-screen centerXY md:p-0`}>
      {/* Card */}
      <div className="max-w-[500px] bg-white md:border md:border-blue-200 px-14 py-16 rounded md:shadow">
        <p className="text-center text-gray-400 text-lg mb-2 font-semibold">Hello New Pondit 👋</p>
        <h1 className="text-3xl font-semibold capitalize text-center mb-5">Create Your Account</h1>
        {/* login form */}
        <form className="mt-10" onSubmit={singupHandler}>
          <div className="flex gap-5">
            <input
              type="text"
              name="firstName"
              className={`input mb-5`}
              placeholder="First name"
              required
            />
            <input
              type="text"
              name="lastName"
              className={`input mb-5`}
              placeholder="Last name"
              required
            />
          </div>

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
            className={`w-full rounded block mt-10 text-white p-3 hover:scale-105 transition`}
            disabled={loading}
            style={{ backgroundColor: loading ? "#9BA3AF" : "#DC2626" }}
          >
            {loading ? "Loading" : "Sign Up"}
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
          Already Have an Account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer underline"
            onClick={() => {
              path("/login");
            }}
          >
            Login Here!
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;

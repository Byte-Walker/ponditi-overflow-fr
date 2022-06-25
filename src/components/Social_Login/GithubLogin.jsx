import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.init";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import { useEffect } from "react";

const GithubLogin = () => {
  const githubProvider = new GithubAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const user_email = result.user.email;
      const name = result.user.displayName;
      const img_url = result.user.photoURL;
      const user_pass = null;
      const userInfo = { user_email, name, img_url, user_pass };
      console.log(userInfo);
      // * sending to server * //
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
          }
        });
    });
  };

  return (
    <button
      className={`bg-white p-3 rounded-lg border gap-3 centerXY hover:scale-105 hover:border-red-500 transition`}
      onClick={loginWithGoogle}
    >
      <BsGithub /> Github
    </button>
  );
};
export default GithubLogin;

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.init";
import { BsGithub } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../toastConfig";

const GithubLogin = () => {
  const githubProvider = new GithubAuthProvider();
  const { manageUser } = useContext(UserContext);
  const path = useNavigate();
  const loginWithGoogle = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user_email = result.user.email;
        const user_name = result.user.displayName;
        const img_url = result.user.photoURL;
        const userInfo = { user_email, user_name, img_url };

        // * sending to server * //
        const url = `https://ponditi-overflow.herokuapp.com/sociallogin`;
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
              manageUser(res);
              localStorage.setItem("userInfo", JSON.stringify(res));
              path("/");
            }
          });
      })
      .catch((err) => toast.error(err.code, toastConfig));
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

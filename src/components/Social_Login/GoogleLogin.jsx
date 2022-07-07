import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.init";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../toastConfig";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/UserContext";

const GoogleLogin = () => {
  const googleProvider = new GoogleAuthProvider();
  const path = useNavigate();
  const { manageUser } = useContext(UserContext);
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user_email = result?.user?.email;
        const user_name = result?.user?.displayName;
        const img_url = result?.user?.photoURL;
        const user_pass = "";
        const userInfo = { user_email, user_name, img_url, user_pass };
        // * sending to server * //
        const url = `http://localhost:5500/sociallogin`;
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
      <FcGoogle /> Google
    </button>
  );
};
export default GoogleLogin;

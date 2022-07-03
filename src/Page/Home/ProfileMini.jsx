import React from "react";
import { useNavigate } from "react-router-dom";
import DpMaker from "../../components/DpMaker/DpMaker";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/firebase.init";

const ProfileMini = ({ isOPen, setIsOpen }) => {
  const [user, loading] = useAuthState(auth);
  const path = useNavigate();
  // if loading component won't mount
  if (loading) {
    return null;
  }

  if (!isOPen) {
    return null;
  }
  return (
    <section
      className="absolute top-[60px] right-0 bg-gray-300 p-3 w-[300px] rounded-md"
      style={{ display: isOPen ? "block" : "none" }}
    >
      <div className="flex items-center gap-5 cursor-pointer mb-3" onClick={() => path("/profile")}>
        <div>{false ? <img src="" alt="" /> : <DpMaker name={user?.displayName} />}</div>
        <h1>{user?.displayName}</h1>
      </div>
      <button
        className="btn-red"
        onClick={() => {
          signOut(auth);
          setIsOpen(false);
          path("/login");
        }}
      >
        Logout
      </button>
    </section>
  );
};

export default ProfileMini;

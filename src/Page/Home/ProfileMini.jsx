import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DpMaker from "../../components/DpMaker/DpMaker";
import UserDP from "../../components/UserDP/UserDP";
import { UserContext } from "../../ContextAPI/UserContext";

const ProfileMini = ({ isOPen, setIsOpen }) => {
  const path = useNavigate();
  const { user, manageUser } = useContext(UserContext);
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    manageUser("log-out", null);
    path("/login");
  };

  if (!isOPen) {
    return null;
  }
  return (
    <section
      className="absolute top-[60px] right-0 bg-gray-300 p-3 w-[300px] rounded-md"
      style={{ display: isOPen ? "block" : "none" }}
    >
      <div
        className="flex items-center gap-5 cursor-pointer mb-3"
        onClick={() => path(`/profile/${user?.user_email}`)}
      >
        <UserDP dimension={"45px"} img_url={user?.img_url} user_name={user?.user_name} />
        <h1>{user?.user_name}</h1>
      </div>
      <button className="btn-red" onClick={handleLogOut}>
        Logout
      </button>
    </section>
  );
};

export default ProfileMini;

import React, { useContext, useState } from "react";
import { MdOutlineWork, MdEmail } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/toastConfig";
import { UserContext } from "../../ContextAPI/UserContext";
import useUserInfo from "../../Hooks/useUserInfo";
import { useParams } from "react-router-dom";

const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, manageUser } = useContext(UserContext);
  const { user_email_id } = useParams();
  const userInfo = useUserInfo(user_email_id);

  const [job, setJob] = useState(user?.job);
  const [study, setStudy] = useState(user?.study);
  const [location, setLocation] = useState(user?.location);

  const updateProfile = (e) => {
    e.preventDefault();

    // * gatering all profile info * //
    const profileInfo = { job, study, location, user_email: user?.user_email };
    // * sending data to server *//
    const url = `http://localhost:5500/updateProfile`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Your Profile Updated", toastConfig);
          console.log(res);
          manageUser(res);
          localStorage.setItem("userInfo", JSON.stringify(user));
          e.target.reset();
          setOpenModal(false);
        }
      });
    console.log(profileInfo);
  };
  return (
    <section className="p-5 card">
      <div>
        <div className="centerY justify-between mb-5">
          <h1 className="text-2xl font-semibold">Basic Overview</h1>
          <button
            className="text-xl centerXY rounded-full bg-gray-300 h-[40px] w-[40px] transition 
            hover:scale-125 hover:bg-red-600 hover:text-white"
            // * checking if user if the currently logged in * //
            style={{ display: user?.user_email === userInfo?.user_email ? "flex" : "none" }}
            onClick={() => setOpenModal(true)}
          >
            <AiOutlineEdit />
          </button>
        </div>
        {/* Works */}
        <div className="centerY gap-4 mb-2" style={{ display: userInfo?.job ? "flex" : "none" }}>
          <button className="text-2xl">
            <MdOutlineWork />
          </button>
          <p className="text-md">
            {" "}
            <span className="font-semibold">{userInfo?.job}</span>{" "}
          </p>
        </div>
        {/* study */}
        <div className="centerY gap-4 mb-2" style={{ display: userInfo?.study ? "flex" : "none" }}>
          <button className="text-2xl">
            <FaUserGraduate />
          </button>
          <p className="text-md">
            Studies at <span className="font-semibold">{userInfo?.study}</span>
          </p>
        </div>

        {/* Email */}
        <div className="centerY gap-4 mb-2">
          <button className="text-2xl">
            <MdEmail />
          </button>
          <p className="text-md">
            Email : <span className="font-semibold">{userInfo?.user_email}</span>
          </p>
        </div>
        {/* Lives */}
        <div className="centerY gap-4" style={{ display: userInfo?.location ? "flex" : "none" }}>
          <button className="text-2xl">
            <ImLocation />
          </button>
          <p className="text-md">
            Lives in <span className="font-semibold">{userInfo?.location}</span>
          </p>
        </div>
      </div>
      <Modal title={"Add Your Basic Infor"} openModal={openModal} setOpenModal={setOpenModal}>
        <form className="p-5 flex gap-5 flex-col" onSubmit={updateProfile}>
          <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3 rounded">
            <h1 className="font-semibold text-base text-center">Update Your Profile</h1>
          </div>
          <input
            type="text"
            className="input"
            placeholder="What Do You DO?"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          />
          <input
            type="text"
            name="study"
            className="input"
            placeholder="Where Do You Study?"
            onChange={(e) => setStudy(e.target.value)}
            value={study}
          />
          <input
            type="text"
            className="input"
            placeholder="Where Do You Live?"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <button className="btn-red mt-5">Submit</button>
        </form>
      </Modal>
    </section>
  );
};

export default About;

import React, { useState } from "react";
import { MdOutlineWork, MdEmail } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import { toastConfig } from "../../components/toastConfig";

const About = () => {
  const [openModal, setOpenModal] = useState(false);

  const updateProfile = (e) => {
    e.preventDefault();
    // * gatering all profile info * //
    const job = e.target.elements.job.value;
    const study = e.target.elements.study.value;
    const location = e.target.elements.location.value;
    // ! have to add email into the object as well ! //
    const profileInfo = { job, study, location };
    // * sending data to server *//
    const url = `http://localhost:5500/updateProfile`;
    fetch
      .post(url, {
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
          e.target.reset();
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
            onClick={() => setOpenModal(true)}
          >
            <AiOutlineEdit />
          </button>
        </div>
        {/* Works */}
        <div className="centerY gap-4 mb-2">
          <button className="text-2xl">
            <MdOutlineWork />
          </button>
          <p className="text-md">
            {" "}
            <span className="font-semibold">Junior Front End Web Developer</span>{" "}
          </p>
        </div>
        {/* study */}
        <div className="centerY gap-4 mb-2">
          <button className="text-2xl">
            <FaUserGraduate />
          </button>
          <p className="text-md">
            Studies at{" "}
            <span className="font-semibold">Bangladesh University of Business Technology</span>
          </p>
        </div>

        {/* Email */}
        <div className="centerY gap-4 mb-2">
          <button className="text-2xl">
            <MdEmail />
          </button>
          <p className="text-md">
            Email : <span className="font-semibold">faisal.ahmed.20.35.197@gmail.com</span>
          </p>
        </div>
        {/* Lives */}
        <div className="centerY gap-4">
          <button className="text-2xl">
            <ImLocation />
          </button>
          <p className="text-md">
            Lives in <span className="font-semibold">Dhaka, Bangladesh</span>
          </p>
        </div>
      </div>
      <Modal title={"Add Your Basic Infor"} openModal={openModal} setOpenModal={setOpenModal}>
        <form className="p-5 flex gap-5 flex-col" onSubmit={updateProfile}>
          <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3 rounded">
            <h1 className="font-semibold text-base text-center">Update Your Profile</h1>
          </div>
          <input type="text" name="job" className="input" placeholder="Where Do You Work?" />
          <input type="text" name="study" className="input" placeholder="Where Do You Study?" />
          <input type="text" name="location" className="input" placeholder="Where Do You Live?" />
          <button className="btn-red">Submit</button>
        </form>
      </Modal>
    </section>
  );
};

export default About;

import React, { useState } from "react";
import { MdOutlineWork, MdEmail } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";

const About = () => {
  const [openModal, setOpenModal] = useState(false);
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
        <form className="p-5 flex gap-5 flex-col">
          <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-3 rounded">
            <h1 className="font-semibold text-base">
              Tips on quickly completiing your profile info
            </h1>
            <div className="px-4">
              <ul className="list-disc">
                <li>Don't misspleeed</li>
              </ul>
            </div>
          </div>
          <input type="text" className="input" placeholder="Where Do You Work?" />
          <input type="text" className="input" placeholder="Where Do You Study?" />
          <input type="text" className="input" placeholder="Where Do You Live?" />
          <button className="btn-red">Submit</button>
        </form>
      </Modal>
    </section>
  );
};

export default About;

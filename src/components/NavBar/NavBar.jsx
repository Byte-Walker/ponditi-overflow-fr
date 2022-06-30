import React, { useState } from "react";
import DpMaker from "../DpMaker/DpMaker";
import { VscNotebook, VscNote, VscHome, VscBell } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import CustomNavLink from "../CustomNavLink/CustomNavLink";
import Modal from "../Modal/Modal";
import ProfileMini from "../../Page/Home/ProfileMini";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isProfileMiniOpen, setIsProfileMiniOpen] = useState(false);

  return (
    <section className="bg-white sticky py-1 top-0 z-50 shadow">
      <nav className="container mx-auto navGrid">
        {/* left */}
        <div className="centerY gap-5">
          <h1 className="text-2xl font-title text-red-600">Ponditi Overflow</h1>
        </div>
        {/* middle */}
        {/* navigation link */}
        <div className="flex justify-center gap-7">
          <CustomNavLink to={"/"}>
            <VscHome />
          </CustomNavLink>
          <CustomNavLink to={"/answer"}>
            <VscNotebook />
          </CustomNavLink>
          <CustomNavLink to={"/following"}>
            <VscNote />
          </CustomNavLink>
          <CustomNavLink to={"/following"}>
            <VscBell />
          </CustomNavLink>
        </div>
        {/* right */}
        <div className="centerY justify-end gap-5">
          <button
            className="text-[20px] h-[40px] w-[40px] rounded-full bg-gray-200 centerXY"
            onClick={() => setOpenModal(true)}
          >
            <BsSearch />
          </button>
          {/* search modal */}
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"What do u want to search?"}
          >
            <>
              <div className="p-5">
                <input className="input" type="text" placeholder="Write the keyword here" />
                <button className="btn-red">Search</button>
              </div>
            </>
          </Modal>
          <div className="relative" onClick={() => setIsProfileMiniOpen(!isProfileMiniOpen)}>
            {false ? (
              <img src="" alt="" />
            ) : (
              <DpMaker name="Faisal" color="#DC2626" height="40px" />
            )}
            <ProfileMini isOPen={isProfileMiniOpen} />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;

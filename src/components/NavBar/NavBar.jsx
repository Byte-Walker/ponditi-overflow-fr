import React, { useContext, useState } from "react";
import { VscNotebook, VscNote, VscHome, VscBell } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import CustomNavLink from "../CustomNavLink/CustomNavLink";
import Modal from "../Modal/Modal";
import ProfileMini from "../../Page/Home/ProfileMini";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import UserDP from "../UserDP/UserDP";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { SiMusicbrainz } from "react-icons/si";
import DpMaker from "../DpMaker/DpMaker";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isProfileMiniOpen, setIsProfileMiniOpen] = useState(false);
  const path = useNavigate();
  const { user, manageUser } = useContext(UserContext);

  // * logout handler * //
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    manageUser("log-out", null);
    path("/login");
  };
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand onClick={() => path("/")} style={{ cursor: "pointer" }}>
            <SiMusicbrainz className="text-3xl text-blue-600 mr-2" />
            <span className="whitespace-nowrap text-2xl font-semibold  dark:text-white text-blue-900 font-title">
              Ponditi-Overflow
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <>
                  {user?.img_url === "null" || user?.img_url === "" ? (
                    <DpMaker name={user?.user_name} />
                  ) : (
                    <Avatar alt="User settings" img={user?.img_url} rounded={true} />
                  )}
                </>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.user_name}</span>
                <span className="block truncate text-sm font-medium">{user?.user_email}</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => path(`/profile/${user?.user_email}`)}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
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
            <Navbar.Link href="/navbars" active={true}></Navbar.Link>
            {/* <Navbar.Link href="/navbars" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">About</Navbar.Link>
            <Navbar.Link href="/navbars">Services</Navbar.Link>
            <Navbar.Link href="/navbars">Pricing</Navbar.Link>
            <Navbar.Link href="/navbars">Contact</Navbar.Link> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </section>

    // <section className="bg-white sticky py-1 top-0 z-50 shadow">
    //   <nav className="container mx-auto navGrid">
    //     {/* left */}
    //     <div className="centerY gap-5">
    //       <h1 className="text-2xl font-title text-red-600 cursor-pointer" onClick={() => path("/")}>
    //         Ponditi Overflow
    //       </h1>
    //     </div>
    //     {/* middle */}
    //     {/* navigation link */}
    //     <div className="flex justify-center gap-7">
    //       <CustomNavLink to={"/"}>
    //         <VscHome />
    //       </CustomNavLink>
    //       <CustomNavLink to={"/answer"}>
    //         <VscNotebook />
    //       </CustomNavLink>
    //       <CustomNavLink to={"/following"}>
    //         <VscNote />
    //       </CustomNavLink>
    //       <CustomNavLink to={"/following"}>
    //         <VscBell />
    //       </CustomNavLink>
    //     </div>
    //     {/* right */}
    //     <div className="centerY justify-end gap-5">
    //       <button
    //         className="text-[20px] h-[40px] w-[40px] rounded-full bg-gray-200 centerXY"
    //         onClick={() => setOpenModal(true)}
    //       >
    //         <BsSearch />
    //       </button>
    //       {/* search modal */}
    //       <Modal
    //         openModal={openModal}
    //         setOpenModal={setOpenModal}
    //         title={"What do u want to search?"}
    //       >
    //         <>
    //           <div className="p-5">
    //             <input className="input" type="text" placeholder="Write the keyword here" />
    //             <button className="btn-red mt-5">Search</button>
    //           </div>
    //         </>
    //       </Modal>
    //       <div className="relative">
    //         {user?.user_email ? (
    //           <UserDP
    //             dimension={"40px"}
    //             img_url={user?.img_url}
    //             user_name={user?.user_name}
    //             onClick={() => setIsProfileMiniOpen(!isProfileMiniOpen)}
    //           />
    //         ) : (
    //           <button className="btn-red" onClick={() => path("/login")}>
    //             Login
    //           </button>
    //         )}

    //         <ProfileMini isOPen={isProfileMiniOpen} setIsOpen={setIsProfileMiniOpen} />
    //       </div>
    //     </div>
    //   </nav>
    // </section>
  );
};

export default NavBar;

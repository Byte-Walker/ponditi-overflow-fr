import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { FiEdit, FiHome } from "react-icons/fi";
import CustomNavLink from "../CustomNavLink/CustomNavLink";
import Modal from "../Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";
import { Dropdown, Avatar } from "flowbite-react";
import { SiMusicbrainz } from "react-icons/si";
import DpMaker from "../DpMaker/DpMaker";
import Notification from "../Notification/Notification";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const path = useNavigate();
  const { user, manageUser } = useContext(UserContext);
  const [searchText, setSearchText] = useState("");

  // * logout handler * //
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    manageUser("log-out", null);
    path("/login");
  };
  return (
    <section className="bg-white sticky top-0 z-50 shadow">
      <nav className="container mx-auto navGrid pt-1">
        {/* left */}
        <div className="centerY gap-5">
          <Link to="/" className="centerY pb-2 pt-1">
            <SiMusicbrainz className="text-3xl text-blue-600 mr-2" />
            <span className="whitespace-nowrap text-2xl font-semibold  dark:text-white text-blue-900 font-title">
              Ponditi-Overflow
            </span>
          </Link>
        </div>
        {/* middle */}
        {/* navigation link */}
        <div className="flex justify-center gap-7">
          <CustomNavLink to={"/"}>
            <FiHome />
          </CustomNavLink>
          <CustomNavLink to={"/answer"}>
            <FiEdit />
          </CustomNavLink>
          <CustomNavLink to={`/profile/${user?.user_email}`}>
            <CgProfile />
          </CustomNavLink>
        </div>
        {/* right */}

        <div className="centerY justify-end gap-3">
          <button
            className="text-[20px] h-[37px] w-[37px] rounded-full bg-blue-100 border border-blue-300
             hover:bg-blue-600 hover:text-white hover:border-blue-600 centerXY text-blue-900"
            onClick={() => setOpenModal(true)}
          >
            <BsSearch className="text-[16px]" />
          </button>
          {/* search modal */}

          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"What do u want to search?"}
            width="480px"
          >
            <>
              <form
                className="p-5 pt-3"
                onSubmit={() => {
                  setOpenModal(false);
                  path(`/search/${searchText}`);
                }}
              >
                {/* tips starts */}
                <div className="bg-blue-100 text-blue-600 text-sm p-3 mb-6">
                  <h1 className="font-semibold text-base">
                    Tips on getting the best search results
                  </h1>
                  <div className="px-4 pt-2">
                    <ul className="list-disc flex flex-col gap-1">
                      <li>Type at least 3 characters.</li>
                      <li>It's not google, so lower your expectation baby.</li>
                      <li>Please don't forget to press the search button!!</li>
                    </ul>
                  </div>
                </div>
                {/* tips ends */}
                <input
                  className="input"
                  type="text"
                  placeholder="Write the keyword here"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="btn-red mt-3">Search</button>
              </form>
            </>
          </Modal>

          <Notification />
          <div className="">
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
                <span className="block text-blue-900 text-[16px] truncate font-bold">
                  {user?.user_name}
                </span>
                <span className="block text-gray-500 truncate text-sm font-medium">
                  {user?.user_email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => path(`/profile/${user?.user_email}`)}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => path(`/notifications`)}>Notifications</Dropdown.Item>
              <Dropdown.Item onClick={() => path(`/profile/${user?.user_email}/questions`)}>
                Questions
              </Dropdown.Item>
              <Dropdown.Item onClick={() => path(`/profile/${user?.user_email}/answers`)}>
                Answers
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;

import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import UserDP from "../../components/UserDP/UserDP";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { SiMusicbrainz } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  //
  const userInfo = [
    {
      name: "Faisal Ahmed",
      img: "https://i.ibb.co/v3SZHs0/faisal.jpg",
      id: "19202103135",
      intake: "44/3",
      fbLink: "https://www.facebook.com/faisal.ahmed.19/",
      gitLink: "https://github.com/Os-Traveller",
      poditiLink: "faisal.ahmed.20.35.197@gmail.com",
    },
    {
      name: "Md Shahidul Islam",
      img: "https://i.ibb.co/HhQT8jS/shahid-compressed.jpg",
      id: "19202103148",
      intake: "44/3",
      fbLink: "https://www.facebook.com/profile.php?id=100008215602384",
      gitLink: "https://github.com/Byte-Walker",
      poditiLink: "mdshahidulridoy@gmail.com",
    },
    {
      name: "Eshad Akter Esha",
      img: "https://i.ibb.co/jLWKt5R/esha.jpg",
      id: "19202103150",
      intake: "44/3",
      fbLink: "https://www.facebook.com/eshadakter.esha",
      gitLink: "https://github.com",
      poditiLink: "esha69462@gmail.com",
    },
    {
      name: "Farjana Afreen Mim",
      img: "https://i.ibb.co/pxQt7NZ/afreen.jpg",
      id: "20211103017",
      intake: "46/1",
      fbLink: "https://www.facebook.com/mihira.alexandra",
      gitLink: "https://github.com",
      poditiLink: "afreenfarjana18@gmail.com",
    },
    {
      name: "Md. Azmol Hasan Ratul",
      img: "https://i.ibb.co/BCZmk1P/ratul.jpg",
      id: "20211103023",
      intake: "46/1",
      fbLink: "https://www.facebook.com/ah.ratul.7",
      gitLink: "https://github.com",
      poditiLink: "",
    },
    {
      name: "Md. Thanos Ansary Fahim",
      img: "https://i.ibb.co/gdmDSyJ/Fahim-min.jpg",
      id: "20211103024",
      intake: "46/1",
      fbLink: "https://www.facebook.com/fahim.ansawri.7",
      gitLink: "https://github.com",
      poditiLink: "fahimansawri550@gmail.com",
    },
  ];
  return (
    <>
      <NavBar />
      <section className="mt-16 w-[1120px] mx-auto">
        <div className="mb-28 text-center">
          <h1 className="font-black text-4xl mb-3 text-blue-900">About Us</h1>
          <p className="text-xl">
            These are the over-ambitious people who work hard just to become cool😎
          </p>
        </div>
        <div className="grid gap-x-5 gap-y-20 grid-cols-3">
          {userInfo.map((user, index) => (
            <UserCard userInfo={user} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

const UserCard = ({ userInfo }) => {
  const { name, img, id, intake, fbLink, gitLink, poditiLink } = userInfo;
  const path = useNavigate();

  return (
    <div className="card pb-5 relative">
      <div className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] hover">
        <UserDP dimension={"120px"} img_url={img} />
      </div>
      <div className="mt-20 px-5 text-center">
        <h1 className="text-xl font-semibold mb-3">{name}</h1>
        <div className="text-sm text-gray-500 font-semibold">
          <p>{id}</p>
          <p>{intake}</p>
          <p className="font-semibold">Dept. Of CSE at BUBT</p>
        </div>
        <div className="centerXY gap-x-5  mt-5">
          <a
            className="cursor-pointer text-2xl  hover:text-blue-600 hover:scale-125 transitionClass"
            href={fbLink}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <BsFacebook />
          </a>
          <a
            className="cursor-pointer text-2xl hover:scale-125 transitionClass"
            href={gitLink}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <BsGithub />
          </a>
          <p
            className="cursor-pointer text-2xl hover:scale-125 hover:text-blue-600 transitionClass"
            onClick={() => path(`/profile/${poditiLink}`)}
          >
            <SiMusicbrainz />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

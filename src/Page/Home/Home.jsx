import React from "react";
import Feed from "../../components/Feed/Feed";
import NavBar from "../../components/NavBar/NavBar";
import Post from "./Post";

const Home = () => {
  const feedInfo = [
    {
      name: "Son Goku Kakarot",
      designation: "Font End Developer",
      question: "What is React",
      answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur reiciendis asperiores
      illo ab quam! Excepturi eaque est esse mollitia accusantium enim pariatur. Eum culpa fugiat
      accusantium alias reprehenderit quos rerum dolorum nesciunt recusandae aut, praesentium, porro
      architecto natus? Molestiae, magni?`,
      love: 10,
      comment: 20,
      share: 30,
    },
    {
      name: "Shakib Al Hasan",
      designation: "Full Stack Developer",
      question: "What is NodeJs",
      answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur reiciendis asperiores
      illo ab quam! Excepturi eaque est esse mollitia accusantium enim pariatur. Eum culpa fugiat
      accusantium alias reprehenderit quos rerum dolorum nesciunt recusandae aut, praesentium, porro
      architecto natus? Molestiae, magni?`,
      love: 406,
      comment: 205,
      share: 130,
    },
    {
      name: "Adam Grilcist",
      designation: "Useless MF",
      question: "What is Programming",
      answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur reiciendis asperiores
      illo ab quam! Excepturi eaque est esse mollitia accusantium enim pariatur. Eum culpa fugiat
      accusantium alias reprehenderit quos rerum dolorum nesciunt recusandae aut, praesentium, porro
      architecto natus? Molestiae, magni?`,
      love: 46,
      comment: 22,
      share: 110,
    },
  ];
  return (
    <>
      <NavBar />
      <section className="container mx-auto homePageGrid gap-10 mt-3">
        <div></div>
        <div className="">
          <Post />
          {feedInfo.map((feedInformation) => (
            <Feed feedInfo={feedInformation} key={Math.random()} />
          ))}
        </div>
        <div></div>
      </section>
    </>
  );
};

export default Home;

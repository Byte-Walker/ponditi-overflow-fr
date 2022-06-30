import React from "react";
import Feed from "../../components/Feed/Feed";

const Home = () => {
  const feedInfo = [
    {
      name: "Faisal Ahmed",
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
      name: "Shahidul Islam",
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
  ];
  return (
    <section className="container mx-auto p-5 ">
      {feedInfo.map((feedInformation) => (
        <Feed feedInfo={feedInformation} />
      ))}
    </section>
  );
};

export default Home;

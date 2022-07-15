import React from "react";
import { useState } from "react";

const TagSuggestion = () => {
  const dummyTaglist = [
    { tag: "Marvel", tag_color: "#1abc9c" },
    { tag: "DC", tag_color: "#2c3e50" },
    { tag: "The Boys", tag_color: "#34495e" },
    { tag: "Physics", tag_color: "#f1c40f" },
    { tag: "DODC", tag_color: "#f1c40f" },
  ];
  const tagColors = [
    { name: "blue", code: "rgb(185 28 28)" },
    { name: "orange", code: "rgb(194 65 12)" },
    { name: "amber", code: "rgb(180 83 9)" },
    { name: "yellow", code: "rgb(161 98 7)" },
    { name: "lime", code: "rgb(77 124 15)" },
    { name: "green", code: "rgb(21 128 61)" },
    { name: "emerald", code: "rgb(4 120 87)" },
    { name: "teal", code: "rgb(15 118 110)" },
    { name: "cyan", code: "rgb(14 116 144)" },
    { name: "blue", code: "rgb(29 78 216)" },
    { name: "indigo", code: "rgb(67 56 202)" },
    { name: "violet", code: "rgb(109 40 217)" },
    { name: "purple", code: "rgb(126 34 206)" },
    { name: "fuchsia", code: "rgb(162 28 175)" },
    { name: "pink", code: "rgb(190 24 93)" },
    { name: "rose", code: "rgb(190 18 60)" },
  ];
  // * selected tags * //
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState("");

  return (
    <form>
      <div className="flex flex-wrap gap-4 my-3">
        {dummyTaglist.map((tag, index) => (
          <TagBox tagName={tag.tag} key={index} />
        ))}
      </div>
      <input
        type="text"
        className="rounded-lg border-b border-gray-400 w-full mb-3"
        placeholder="# Tags"
      />
      <Suggetion tagAll={dummyTaglist} keyword={keyword} />
    </form>
  );
};

const TagBox = ({ tagName }) => {
  const [showCross, setShowCross] = useState(false);
  return (
    <div
      className="bg-gray-300 p-1 rounded cursor-default relative"
      onMouseOver={() => setShowCross(true)}
      onMouseLeave={() => setShowCross(false)}
    >
      <h1>{tagName}</h1>
      <div
        style={{ display: showCross ? "flex" : "none" }}
        className="abs  rounded-full cursor-pointer bg-gray-500 text-white h-[20px] w-[20px] centerXY"
      >
        <h1>x</h1>
      </div>
    </div>
  );
};

const Suggetion = ({ tagAll, keyword }) => {
  const tags = tagAll && tagAll.filter((tag) => tag.tag.includes(keyword));

  return (
    <div>
      {tags.map((tag) => (
        <h1>tags.tag</h1>
      ))}
    </div>
  );
};

export default TagSuggestion;

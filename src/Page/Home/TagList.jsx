import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaSlackHash } from "react-icons/fa";
import useGetTags from "../../Hooks/useGetTags";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TagList = () => {
  const { tags, tagsRefetch } = useGetTags();
  const [showall, setShowAll] = useState(false);
  const path = useNavigate();

  useEffect(() => {
    tagsRefetch();
  }, [tagsRefetch]);
  return (
    <div className="tag-list card pb-5 h-fit sticky top-20">
      <div className="sticky top-[0] bg-white px-5 pt-5 pb-4">
        <h1 className="bg-blue-600 text-white rounded px-5 py-2 text-center font-semibold uppercase">
          Tag List
        </h1>
      </div>

      {tags?.length === 0 && <h1 className="text-center mt-5 font-semibold">No Tags Found😞</h1>}

      <div className="mb-5">
        {showall ? (
          <div>
            {tags &&
              tags?.map((tag, index) => (
                <div
                  className="cursor-pointer px-5"
                  key={index}
                  onClick={() => path(`/tags/${tag?.tag_name.slice(1)}`)}
                >
                  <div className="centerY gap-3 text-lg hover:bg-gray-300 p-1 rounded text-blue-900">
                    <div>
                      <FaSlackHash className="text-blue-600" />{" "}
                    </div>
                    <p className="hover:underline truncate uppercase">{tag?.tag_name.slice(1)}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>
            {tags &&
              tags?.slice(0, 10).map((tag, index) => (
                <div
                  className="cursor-pointer px-5"
                  key={index}
                  onClick={() => path(`/tags/${tag?.tag_name.slice(1)}`)}
                >
                  <div className="centerY gap-3 text-lg hover:bg-gray-300 p-1 rounded text-blue-900">
                    <div>
                      <FaSlackHash className="text-blue-600" />{" "}
                    </div>
                    <p className="hover:underline truncate uppercase">{tag?.tag_name.slice(1)}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div style={{ display: tags?.length <= 10 ? "none" : "block" }}>
        <button
          style={{ display: showall ? "none" : "flex" }}
          className="bg-blue-600 text-white w-fit rounded-full  mx-auto mt-2 px-5 py-1 centerY gap-1"
          onClick={() => setShowAll(true)}
        >
          See All <IoIosArrowDown />
        </button>
        <button
          style={{ display: showall ? "flex" : "none" }}
          className="bg-blue-600 text-white w-fit rounded-full block mx-auto mt-2 px-5 py-1 centerY gap-1"
          onClick={() => setShowAll(false)}
        >
          Show less <IoIosArrowUp />
        </button>
      </div>
    </div>
  );
};

export default TagList;

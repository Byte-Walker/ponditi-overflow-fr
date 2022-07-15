import React from "react";
import { useEffect } from "react";
import { FaSlackHash } from "react-icons/fa";
import useGetTags from "../../Hooks/useGetTags";

const TagList = () => {
  const { tags, tagsRefetch } = useGetTags();
  useEffect(() => {
    tagsRefetch();
  }, [tagsRefetch]);
  return (
    <div className="cursor-pointer">
      <div className="bg-blue-600 text-white rounded p-1 text-center mb-4">Tag List</div>
      {tags &&
        tags.map((tag, index) => (
          <div key={index}>
            <div className="centerY gap-3 text-lg hover:bg-gray-300 p-1 rounded text-blue-900">
              <div>
                <FaSlackHash className="text-blue-600" />{" "}
              </div>
              <p className="hover:underline truncate uppercase">{tag?.tag_name}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TagList;

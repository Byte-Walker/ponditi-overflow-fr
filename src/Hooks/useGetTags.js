import { useQuery } from "react-query";
const useGetTags = () => {
  const { data: tags, refetch: tagsRefetch } = useQuery("getAllTags", () =>
    fetch("https://ponditi-overflow.herokuapp.com/tags").then((res) => res.json())
  );
  return { tags, tagsRefetch };
};
export default useGetTags;

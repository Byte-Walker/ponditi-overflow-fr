import { useQuery } from "react-query";
const useGetTags = () => {
  const { data: tags, refetch: tagsRefetch } = useQuery("getAllTags", () =>
    fetch("http://localhost:5500/tags").then((res) => res.json())
  );
  return { tags, tagsRefetch };
};
export default useGetTags;

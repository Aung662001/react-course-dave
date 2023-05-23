import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, error, loading } = useAxiosFetch("http://localhost:3500/posts");
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(typeof posts);
    if (posts.length !== 0) {
      const filteredResults = posts.filter(
        (post) =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
      );

      setSearchResults(filteredResults.reverse());
    }
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        navigate,
        posts,
        setPosts,
        error,
        loading,
        search,
        setSearch,
        searchResults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;

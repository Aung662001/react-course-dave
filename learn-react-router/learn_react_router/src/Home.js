import { useContext } from "react";
import Feed from "./Feed";
import { DataContext } from "./context/DataContext";

const Home = () => {
  const { searchResults, error, loading } = useContext(DataContext);
  return (
    <main className="Home">
      {loading && <p>Loading... Please Wait A Movement!</p>}
      {!loading && error && <p style={{ color: "red" }}>{error.error}</p>}
      {!error &&
        !loading &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No posts to display.</p>
        ))}
    </main>
  );
};

export default Home;

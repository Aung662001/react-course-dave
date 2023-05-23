import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditPost from "./EditPost";
import DataProvider from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DataProvider>
          <Header title="React JS Blog" />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<NewPost />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

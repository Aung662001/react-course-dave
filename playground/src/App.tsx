import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { ShoppingCartContext } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartContext>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartContext>
  );
}

export default App;

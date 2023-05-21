import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import "./App.css";
import { Item } from "./Content";
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";
type deleteHandle = (id: number) => void;

function App() {
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>(
    JSON.parse(localStorage.getItem("ListItems")!) || []
  );
  useEffect(() => {
    localStorage.setItem("ListItems", JSON.stringify(items));
  }, [items]);

  const handleCheck = (id: number) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    // setItems([...listItems]);
    setItems([...listItems]);
  };
  const handleDelete: deleteHandle = (id) => {
    const filteredItems = items.filter((item) => {
      return item.id !== id;
    });
    // setItems([...filteredItems]);
    setItems([...filteredItems]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItemObj = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item: newItem,
    };
    // setItems();
    setItems([...items, newItemObj]);
    setNewItem("");
  };
  useEffect(() => {
    localStorage.setItem("ListItems", JSON.stringify(items));
  }, []);
  return (
    <section className="container">
      <Header title="Groceries List" />
      <AddItems
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        newItem={newItem}
      />
      <SearchItems search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items !== null ? items.length : 0} />
    </section>
  );
}

export default App;

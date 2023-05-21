import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import "./App.css";
import { Item } from "./Content";
import AddItems from "./AddItems";
import SearchItems from "./SearchItems";
import apiRequest from "./apiRequest";
type deleteHandle = (id: number) => void;

export const API_URL = "http://localhost:3500/items";
function App() {
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // localStorage.setItem("ListItems", JSON.stringify(items));
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (response.ok) {
          const listItems = await response.json();
          setItems(listItems);
        } else {
          throw new Error("Error in fetching data");
        }
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheck = async (id: number) => {
    const listItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    // setItems([...listItems]);
    setItems([...listItems]);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const result = await apiRequest(`${API_URL}/${id}`, updateOptions);
    if (result) setError(result);
  };
  const handleDelete: deleteHandle = async (id) => {
    const filteredItems = items.filter((item) => {
      return item.id !== id;
    });
    // setItems([...filteredItems]);
    setItems([...filteredItems]);
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await apiRequest(`${API_URL}/${id}`, deleteOptions);
    if (result) setError(result);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItemObj = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item: newItem,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemObj),
    };
    const result = await apiRequest(`${API_URL}`, postOptions);
    if (result) setError(result);
    // setItems();
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  return (
    <section className="container">
      <Header title="Groceries List" />
      <AddItems
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        newItem={newItem}
      />
      <SearchItems search={search} setSearch={setSearch} />
      {error ? (
        <h1>{error}</h1>
      ) : loading ? (
        <h1>Loading...Wait a movement...</h1>
      ) : (
        <Content
          items={items.filter(
            (item) =>
              item &&
              item.item &&
              item.item.toLowerCase().includes(search.toLowerCase())
          )}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      )}
      <Footer length={items !== null ? items.length : 0} />
    </section>
  );
}

export default App;

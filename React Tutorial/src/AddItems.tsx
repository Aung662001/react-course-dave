import React, { LegacyRef, useRef } from "react";
import { FaPlus } from "react-icons/fa";
interface AddItemProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  newItem: string;
}
function AddItems(props: AddItemProps) {
  const { handleSubmit, setNewItem, newItem } = props;
  return (
    <form className="addForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        id="addItem"
        type="text"
        required
        placeholder="Add Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button type="submit" aria-label="add-item-icon">
        <FaPlus />
      </button>
    </form>
  );
}

export default AddItems;

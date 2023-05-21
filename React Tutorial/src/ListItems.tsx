import React from "react";
import { FaTrashAlt } from "react-icons/fa";

import { Item } from "./Content";
interface ListItemsProps {
  item: Item;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}
function ListItems(props: ListItemsProps) {
  const { item, setItems, handleCheck, handleDelete } = props;
  return (
    <li
      className="item"
      // onClick={() => handleCheck(item.id)}
    >
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleCheck(item.id)}
      ></input>
      <p className="itemName" onClick={() => handleCheck(item.id)}>
        {item.item}
      </p>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
      />
    </li>
  );
}

export default ListItems;

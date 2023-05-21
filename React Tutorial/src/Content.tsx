import React, { useEffect, useState } from "react";
import ListItems from "./ListItems";

export interface Item {
  id: number;
  checked: boolean;
  item: string;
}
interface Props {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
}

function Content(props: Props) {
  const { items, setItems, handleCheck, handleDelete } = props;

  return (
    <section className="content">
      <main>
        {items.length === 0 ? (
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            "List is Empty..."
          </h3>
        ) : (
          <ul style={{ listStyle: "none", width: "100%" }}>
            {items.map((item) => {
              return (
                <ListItems
                  item={item}
                  setItems={setItems}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                  key={item.id}
                />
              );
            })}
          </ul>
        )}
      </main>
    </section>
  );
}

export default Content;

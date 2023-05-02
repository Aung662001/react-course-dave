import React from "react";
import { Button, Stack } from "react-bootstrap";
import cartItems from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CurrencyFormatter from "../utilities/CurrencyFormatter";
interface ItemsProp {
  id: number;
  quantity: number;
}
export default function CartItem({ id, quantity }: ItemsProp) {
  const { removeFromCart } = useShoppingCart();
  const item = cartItems.find((item) => item.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.imgUrl}
        width={"100px"}
        height={"70px"}
        style={{ objectFit: "cover" }}
      />
      <div className="me-auto">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            {item.name}&nbsp;
            {quantity && <span className="text-muted">x{quantity}</span>}
          </div>
          <div className="text-muted">{CurrencyFormatter(item.price)}</div>
        </div>
      </div>
      <Stack direction="horizontal" gap={2} className="ml-5">
        <div>{CurrencyFormatter(item.price * quantity)}</div>
        <Button onClick={() => removeFromCart(id)} variant="outline-danger">
          &times;
        </Button>
      </Stack>
    </Stack>
  );
}

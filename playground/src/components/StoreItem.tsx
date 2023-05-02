import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import CurrencyFormatter from "../utilities/CurrencyFormatter";
import { CartContext, useShoppingCart } from "../context/ShoppingCartContext";
interface StoreItemProps {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
}
export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(CartContext);
  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Img
        src={imgUrl}
        variant="top"
        style={{ objectFit: "cover" }}
        height="200px"
      ></Card.Img>
      <Card.Body className="d-flex flex-column gap-3">
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-2">{name}</span>
          <span className="ms-4 text-muted">{CurrencyFormatter(price)}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button className="mt-auto" onClick={() => increaseCartQuantity(id)}>
            Add to cart+
          </Button>
        ) : (
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              <span>{quantity} in cart</span>
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeFromCart(id)}
            >
              Remove Item
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

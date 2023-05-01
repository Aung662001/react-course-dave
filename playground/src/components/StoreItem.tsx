import React from "react";
import { Button, Card } from "react-bootstrap";
import CurrencyFormatter from "../utilities/CurrencyFormatter";
interface StoreItemProps {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
}
export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const quantity = 1;
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
          <Button className="mt-auto">Add to cart+</Button>
        ) : (
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <Button>+</Button>
              <span>{quantity} in cart</span>
              <Button>-</Button>
            </div>
            <Button variant="danger" size="sm">
              Remove Item
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

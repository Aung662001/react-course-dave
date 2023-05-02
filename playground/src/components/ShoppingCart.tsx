import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import allItems from "../data/items.json";
import CurrencyFormatter from "../utilities/CurrencyFormatter";
interface ShoppingProps {
  open: boolean;
}
export default function ShoppingCart({ open }: ShoppingProps) {
  const { closeCart, cartItems } = useShoppingCart();

  console.log(cartItems);

  return (
    <Offcanvas show={open} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-4">
            <span className="fs-3">Total:</span>&nbsp;
            {CurrencyFormatter(
              cartItems.reduce((total, current) => {
                const item = allItems.find((item) => item.id === current.id);
                return total + (item?.price || 0) * current.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

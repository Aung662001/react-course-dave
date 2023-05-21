import React from "react";

interface HeaderProps {
  title: string;
}
function Header(props: HeaderProps) {
  return (
    <section className="header">
      <h1>{props.title ? props.title : ""}</h1>
    </section>
  );
}

export default Header;

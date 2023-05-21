import React from "react";
interface FooterProps {
  length: number;
}
function Footer(props: FooterProps) {
  const { length } = props;

  return (
    <footer className="footer">
      <p>{length !== 0 ? `${length} List Items` : `${length} List Item`}</p>
    </footer>
  );
}

export default Footer;

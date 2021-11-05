import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-section f-section-1">
        <p>
          Bütün hüquqlar qorunur © 2021{" "}
          <Link  to="/">
            Mediasiya Şurası
          </Link>
        </p>
      </div>
    </div>
  );
}

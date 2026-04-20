// src/components/Header.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme } = useTheme();
  const borderColor = theme === "light" ? "#cccccc" : "#555555";

  return (
    <header style={{ borderBottom: `2px solid ${borderColor}`, marginBottom: "1rem", paddingBottom: "0.5rem" }}>
      <h1>Reactive Task Board</h1>
      <p style={{ fontSize: "0.85rem" }}>Current theme: {theme}</p>
    </header>
  );
}

export default Header;
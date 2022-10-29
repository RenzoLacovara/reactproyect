import React from "react";
import Redes from "./Redes";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-secundario h-28 w-full">
      <div className="flex justify-center items-center p-2">
        <p>Todos los derechos reservados</p>
      </div>
      <Redes />
    </footer>
  );
};

export default Footer;

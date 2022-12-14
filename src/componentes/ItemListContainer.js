import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import ItemList from "./ItemList";
import { generarPromesa } from "./utils";
import { collection, query, where, getDocs } from "firebase/firestore";
import Snitch from "./Snitch";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { oferta, ssid } = useParams();

  useEffect(() => {
    const coleccion = collection(db, "productos");
    if (oferta) {
      const filtro = query(coleccion, where("oferta", "==", true));
      const consulta = getDocs(filtro);
      generarPromesa(consulta)
        .then((respuesta) => {
          const productos = respuesta.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setItems(productos);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (ssid) {
      const filtro2 = query(coleccion, where("tienda.id", "==", ssid));
      const consulta2 = getDocs(filtro2);
      generarPromesa(consulta2)
        .then((respuesta) => {
          const productos2 = respuesta.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setItems(productos2);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const consulta3 = getDocs(coleccion);
      generarPromesa(consulta3)
        .then((respuesta) => {
          const productos3 = respuesta.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setItems(productos3);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [oferta, ssid]);

  return (
    <div className="p-4 text-xl flex justify-center mt-3">
      {items.length === 0 ? <Snitch /> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;

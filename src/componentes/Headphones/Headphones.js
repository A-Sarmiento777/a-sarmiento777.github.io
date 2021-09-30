import React, { useEffect, useState } from "react";
//import { apiURL } from "../../Utils/ApiUrl";
import Headphone from "../Headphone/Headphone";

const Headphones = ({ agregarProductoAlCarrito, agregarProductoAlCarritoFav, removeItemFromCartFav, cart, favProducts }) => {
  const [headphones, setHeadphones] = useState([]);

  async function getHeadphones() {
    try {
      //let response = await fetch(apiURL + "api/headphones");
      let response = await fetch("/api/headphones");
      let data = await response.json();
      if (data) {
        setHeadphones(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHeadphones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-4 text-center" data-testid="headphones1">
      <h1>Headphones</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {headphones &&
          headphones.map((headphone, index) => {
            return (
				<Headphone agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cart} favProducts={favProducts} headphone={headphone}/>
            );
          })}
      </div>
    </div>
  );
};

export default Headphones;

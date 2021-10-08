import React from "react";
import { Link } from "react-router-dom";

const Headphone = ({priceFormatter, agregarProductoAlCarrito, agregarProductoAlCarritoFav, removeItemFromCartFav, cart, favProducts, headphone }) => {
  return (
    <div className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{ width: "200px", minWidth: "30px" }}>
      <div className="h6">{headphone?.name}</div>
      <div className="h6">
        <small> Pris: {priceFormatter(headphone?.price)} </small>
      </div>
      <div className="mx-auto">
        <img src={process.env.PUBLIC_URL + `/Assets/headphones/${headphone?.name}.jpg`} width="150" alt="logos" className="img-fluid py-2" />
      </div>
      <div>
        {favProducts?.includes(headphone?.name) ? (
          <button className="bg-light border-0" onClick={() => removeItemFromCartFav(headphone.id + "h")}>
            <img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width="20" alt="logo" />
          </button>
        ) : (
          <button
            className="bg-light border-0"
            onClick={() => agregarProductoAlCarritoFav(headphone?.id + "h", headphone?.name, headphone?.price, "headphones")}
          >
            <img src={process.env.PUBLIC_URL + `/Assets/fav.png`} width="20" alt="logo" />
          </button>
        )}
        {cart?.includes(headphone?.name) ? (
          <Link to="/checkout">
            <button className="bg-success px-1 rounded ml-2">Varukorgen</button>
          </Link>
        ) : (
          <button
            className="bg-warning px-1 rounded ml-2"
            onClick={() => agregarProductoAlCarrito(headphone?.id + "h", headphone?.name, headphone?.price, "headphones", 1)}
          >
            Lägg till
          </button>
        )}
      </div>
    </div>
  );
};

export default Headphone;

import React from 'react';
import { Link } from 'react-router-dom';

const Mobile = ({ agregarProductoAlCarrito, agregarProductoAlCarritoFav, removeItemFromCartFav, cart, favProducts, mobile }) => {
    return (
        <div className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{ width: "200px", minWidth: "30px" }}>
            <div className="h6">{mobile?.name}</div>
            <div className="h6"> <small> Price: {mobile?.price} $ </small></div>
            <div className="mx-auto">
                <img src={process.env.PUBLIC_URL + `/Assets/mobiles/${mobile?.name?.replace(' ', '')}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
            </div>
            <div>
                {favProducts?.includes(mobile?.name) ? <button className="bg-light border-0" onClick={() => removeItemFromCartFav(mobile.id + 'm')}>
                    <img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width='20' alt="logo" />
                </button> : <button className="bg-light border-0" onClick={() => agregarProductoAlCarritoFav(mobile?.id + 'm', mobile?.name, mobile?.price, 'mobiles')}>
                    <img src={process.env.PUBLIC_URL + `/Assets/fav.png`} width='20' alt="logo" />
                </button>}
                {cart?.includes(mobile?.name) ? <Link to='/checkout'><button className='bg-success px-1 rounded ml-2'>View Cart</button></Link> : <button className="bg-warning px-1 rounded ml-2" onClick={() => agregarProductoAlCarrito(mobile?.id + 'm', mobile?.name, mobile?.price, 'mobiles', 1)}>Add</button>}
            </div>
        </div>
    );
}

export default Mobile;
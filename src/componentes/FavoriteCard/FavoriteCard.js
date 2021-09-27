import React from 'react';

const FavoriteCard = ({ removeItemFromCartFav, producto }) => {
    return (
        <tr key="index">
            <td><img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.name}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
            <td>{producto.name}</td>
            <td>{producto.price}</td>
            <td onClick={() => removeItemFromCartFav(producto.id)} style={{ color: 'red' }}>Remove</td>
        </tr>
    );
}

export default FavoriteCard;
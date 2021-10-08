import React from 'react';

const FavoriteCard = ({priceFormatter, removeItemFromCartFav, producto }) => {
    return (
        <tr key="index">
            <td><img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.type === 'mobiles' || producto.type === 'laptops' ? producto.name?.replace(' ', '') : producto.name}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
            <td>{producto?.name}</td>
            <td>{priceFormatter(producto?.price)}</td>
            <td onClick={() => removeItemFromCartFav(producto.id)} style={{ color: 'red' }}>Radera</td>
        </tr>
    );
}

export default FavoriteCard;
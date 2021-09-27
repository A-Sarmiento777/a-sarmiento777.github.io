import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const CheckoutCard = ({ removeItemFromCart, increment, decrement, getCart, cart, producto }) => {
    const history = useHistory()
    let amount = cart && cart?.length && cart.map(a => parseInt(a.price) * parseInt(a.quantity))
    let totalAmount = amount && amount.length && amount?.reduce((a, b) => a + b, 0)
    useEffect(() => {
        getCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <tr>
            <td><img src={process.env.PUBLIC_URL + `/Assets/${producto?.type}/${producto?.name}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
            <td>{producto?.name}</td>
            <td><button onClick={() => decrement(producto?.id, producto?.quantity)}>Decrease</button>{'  '}{producto?.quantity}{'  '}<button onClick={() => increment(producto?.id, producto?.quantity)}>Increase</button></td>
            <td>{producto?.price * producto?.quantity}</td>
            <td onClick={() => removeItemFromCart(producto?.id)} style={{ color: 'red' }}>Remove</td>
        </tr>
    );
}


export default CheckoutCard;
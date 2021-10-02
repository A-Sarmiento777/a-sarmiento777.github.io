import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Checkout = ({priceFormatter, removeItemFromCart, increment, decrement, clearCart, getCart, cart }) => {

    const history = useHistory()

	
	let amount = cart && cart?.length && cart.map(a => parseInt(a.price) * parseInt(a.quantity))
	let totalAmount = amount && amount.length && amount?.reduce((a, b) => a + b, 0)
	useEffect(() => {
		getCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	

    return (
        <div className="card p-4 mt-5 pt-4 mb-5 rounded" style={{minWidth:"460px"}}>
            {cart.length ? <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Product</td>
                        <td style={{ fontWeight: 'bold' }}>Title</td>
                        <td style={{ fontWeight: 'bold' }}>Quantity</td>
                        <td style={{ fontWeight: 'bold' }}>Price</td>
                        <td style={{ fontWeight: 'bold' }}>Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map( (producto, index) => {
                        return (
                            <>
                                <tr key="index">
                                    <td><img src={process.env.PUBLIC_URL + `/Assets/${producto?.type}/${producto.type === 'mobiles' || producto.type === 'laptops' ? producto.name?.replace(' ', '') : producto.name}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
                                    <td>{producto?.name}</td>
                                    <td><img src={process.env.PUBLIC_URL + `/Assets/minus.png`} width='30' alt="logo" onClick={() => decrement(producto?.id, producto?.quantity)}/>{'  '}{producto?.quantity}{'  '}<img src={process.env.PUBLIC_URL + `/Assets/plus.png`} width='30' alt="logo" onClick={() => increment(producto?.id, producto?.quantity)}/></td>
                                    <td>{priceFormatter(producto?.price * producto?.quantity)}</td>
                                    <td onClick={() => removeItemFromCart(producto?.id)} style={{ color: 'red' }}>Remove</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table> : <h4>Nothing in cart! Please Add some items</h4>}

            {cart.length ? 
                <div  className="mx-auto">
                <div>
                Price: {priceFormatter(totalAmount - ((totalAmount * 25) / 100))}
                    
                </div>
                <div>
                Incl tax: {priceFormatter(totalAmount)}

                </div>
                <div className="text-center mx-auto">
                    <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => {
                        history.push('/order')
                        clearCart()
                    }}>Checkout</button>
                </div>
                </div>
            : null}

        </div >
    );
}


export default Checkout;
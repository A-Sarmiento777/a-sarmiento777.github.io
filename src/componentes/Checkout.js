import React from 'react';

const Checkout = ({ carrito, removeItemFromCart, clearCart }) => {

    let amount = carrito?.map(a => a.price)
    let totalAmount = amount?.reduce((a, b) => a + b, 0)

    return (
        <div>
            <h3>Carrito de Compras</h3>
            {carrito.length ? <table style={{ width: '100%' }}>
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
                    {carrito?.map(producto => {
                        return (
                            <>
                                <tr>
                                    <td><img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.nombre}.jpg`} width='150' /></td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>{producto.price}</td>
                                    <td onClick={() => removeItemFromCart(producto.id)} style={{ color: 'red' }}>Remove</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table> : <h4>Nothing in cart! Please Add some items</h4>}

            {carrito.length ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div>
                    Total Amount: {totalAmount}
                </div>
                <div>
                    After Tax: {totalAmount - ((totalAmount * 30) / 100)}
                </div>
                <div>
                    <button style={{ backgroundColor: 'black', color: 'white' }} onClick={() => {
                        alert('Thanks for the Shopping')
                        clearCart()
                    }}>Checkout</button>
                </div>
            </div> : null}

        </div >
    );
}


export default Checkout;
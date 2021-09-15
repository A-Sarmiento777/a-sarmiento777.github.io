import React from 'react';

const Checkout = ({ carrito, removeItemFromCart, clearCart }) => {

    let amount = carrito?.map(a => a.price)
    let totalAmount = amount?.reduce((a, b) => a + b, 0)

    return (
        <div className="card p-4 mt-5 pt-4 mb-5 rounded" style={{minWidth:"460px"}}>
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
                    {carrito?.map( (producto, index) => {
                        return (
                            <>
                                <tr key="index">
                                    <td><img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.nombre}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
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

            {carrito.length ? 
                <div  className="mx-auto">
                <div>
                Price: {totalAmount - ((totalAmount * 25) / 100)+ ' kr'}
                    
                </div>
                <div>
                Incl moms: {totalAmount + ' kr'}
                
                </div>
                <div className="text-center mx-auto">
                    <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => {
                        alert('Thanks for the Shopping')
                        clearCart()
                    }}>Checkout</button>
                </div>
                </div>
            : null}

        </div >
    );
}


export default Checkout;
import React from 'react';
import { useHistory } from 'react-router';

const Favorite = ({ carritoFav, agregarProductoAlCarrito, removeItemFromCartFav, clearFav }) => {
    const history = useHistory()
    let amount = carritoFav?.map(a => a.price)
    let totalAmount = amount?.reduce((a, b) => a + b, 0)
    const addFavToCart = async () => {
        await carritoFav?.map((producto) => agregarProductoAlCarrito(producto?.id, producto?.name, producto?.price, producto?.type, 1))
        clearFav()
        history.push('/checkout')
    }
    return (
        <div className="card p-4 mt-5 pt-4 mb-5 rounded" style={{ minWidth: "460px" }}>
            {carritoFav.length ? <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>Produkt</td>
                        <td style={{ fontWeight: 'bold' }}>Namn</td>
                        <td style={{ fontWeight: 'bold' }}>Pris</td>
                        <td style={{ fontWeight: 'bold' }}>Ta bort</td>
                    </tr>
                </thead>
                <tbody>
                    {carritoFav?.map((producto, index) => {
                        return (
                            <>
                                <tr key="index">
                                    <td><img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.name}.jpg`} width='100' alt="logos" className="img-fluid py-2" /></td>
                                    <td>{producto.name}</td>
                                    <td>{producto.price}</td>
                                    <td onClick={() => removeItemFromCartFav(producto.id)} style={{ color: 'red' }}>Radera</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table> : <h4>Finns inget i favoriter. Lägg gärna något produkt.</h4>}

            {carritoFav.length ?
                <div className="mx-auto">
                    <div>
                        Pris: {totalAmount - ((totalAmount * 25) / 100) + ' $'}

                    </div>
                    <div>
                        Inkl moms: {totalAmount + ' $'}

                    </div>
                    <div className="text-center mx-auto">
                        <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={addFavToCart}>Lägg till varukorgen</button>
                        {/* <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => {
                        clearFav()
                        history.push('/home')
                    }}>Clear Favourites</button> */}
                    </div>
                </div>
                : null}
        </div >
    );
}


export default Favorite;
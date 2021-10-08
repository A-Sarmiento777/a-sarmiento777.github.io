import React from 'react';
import { useHistory } from 'react-router';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

const Favorite = ({priceFormatter, carritoFav, agregarProductoAlCarrito, cart, removeItemFromCartFav, clearFav }) => {
    const history = useHistory()
    let amount = carritoFav?.map(a => a.price)
    let totalAmount = amount?.reduce((a, b) => a + b, 0)

    const addFavToCart = async () => {
        let data = carritoFav.filter(item1 => {
            let index = cart.findIndex(item2 => item1.id === item2.id);
            if(index < 0) return true
            
            return false;
            });
        await data?.map((producto) => agregarProductoAlCarrito(producto?.id, producto?.name, producto?.price, producto?.type, 1))
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
                            <FavoriteCard key={index + 1} priceFormatter={priceFormatter} removeItemFromCartFav={removeItemFromCartFav} producto={producto} />
                        )
                    })}
                </tbody>
            </table> : <h4>Finns inget i favoriter. Lägg gärna något produkt.</h4>}

            {carritoFav.length ?
                <div className="mx-auto">
                    <div>
                        Pris: {priceFormatter(totalAmount - ((totalAmount * 25) / 100))}

                    </div>
                    <div>
                        Inkl moms: {priceFormatter(totalAmount)}

                    </div>
                    <div className="text-center mx-auto">
                        {/* <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => {
                        clearFav()
                        history.push('/home')
                    }}>Clear Favourites</button> */}
                        <button className="p-1 rounded" style={{ backgroundColor: 'black', color: 'white' }} onClick={addFavToCart}>Lägg till varukorgen</button>
                    </div>
                </div>
                : null}

        </div >
    );
}


export default Favorite;
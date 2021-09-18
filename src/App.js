import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter, useHistory } from 'react-router-dom';
import Home from './componentes/Home';
import Mobiles from './componentes/Mobiles';
import Headphones from './componentes/Headphones';
import Laptops from './componentes/Laptops';
import Checkout from './componentes/Checkout';
import Favorite from './componentes/Favorite';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Menubar from './componentes/Menu';
import Footer from './componentes/Footer';
const App = (props) => {

    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([])
    const [favourites, setFavourites] = useState([])
    const [carrito, cambiarCarrito] = useState([]);
    const [carritoFav, cambiarCarritoFav] = useState([]);
    const [countFav, setCountFav] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState()
    const history = useHistory()
    const [cartProducts, setCartProducts] = useState([])
    const [favProducts, setFavProducts] = useState([])

    //update count productos
    useEffect(() => {
        contar(carrito);
        contarFav(carritoFav);
    }, [carrito, carritoFav])

    async function simpleFetch(url) {

        return await (await fetch(url)).json();

    }

    async function getCart() {
        try {
            let response = await simpleFetch('http://localhost:4000/api/cart/' + user)
            if (response) {
                setCart(response)
                let names = response.map(a => a.name)
                setCartProducts(names)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function getFavourites() {
        try {
            let response = await simpleFetch('http://localhost:4000/api/favourites/' + user)
            if (response) {
                setFavourites(response)
                let names = response.map(a => a.name)
                setFavProducts(names)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //to acumm cantidad of product inside carrito 
    const contar = (data) => {
        setCount(
            data.reduce(
                (prevValue, currentValue) => prevValue + currentValue.cantidad,
                0
            )
        )
    }

    const contarFav = (data) => {
        setCountFav(
            data.reduce(
                (prevValue, currentValue) => prevValue + currentValue.cantidad,
                0
            )
        )
    }

    const clearCart = () => {
        cambiarCarrito([])
    }

    const clearCartFav = () => {
        cambiarCarritoFav([])
    }

    const agregarProductoAlCarrito = (idProductoAAgregar, nombre, price, type, quantity) => {

        let data
        if (user && isLoggedIn) {
            data = {
                id: idProductoAAgregar,
                name: nombre,
                price: price,
                type: type,
                email: user,
                quantity: quantity
            }
        } else {
            alert('Kindly Login to add to cart')
        }

        if (data) {
            addToCart(data)
        }
        // Si el carrito no tiene elementos entonces agregamos uno.
        if (carrito.length === 0) {
            cambiarCarrito([{ id: idProductoAAgregar, nombre: nombre, price: price, type: type, cantidad: 1 }]);
        } else {
            // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
            // Si ya lo tiene entonces queremos actualizar su valor.
            // Si no tiene el producto entonces lo agregamos.

            // Para poder editar el arreglo tenemos que clonarlo.
            const nuevoCarrito = [...carrito];

            // Comprobamos si el carrito ya tiene el ID del producto a agregar.
            const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                return productoDeCarrito.id === idProductoAAgregar
            }).length > 0;

            // Si ya tiene el producto entonces lo tenemos que actualizar.
            if (yaEstaEnCarrito) {
                // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                // Y en base a su posicion ya actualizamos el valor.
                nuevoCarrito.forEach((productoDeCarrito, index) => {
                    if (productoDeCarrito.id === idProductoAAgregar) {
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {
                            id: idProductoAAgregar,
                            nombre: nombre,
                            price: price * (cantidad + 1),
                            type: type,
                            cantidad: cantidad + 1
                        }
                    }
                });
                // De otra forma entonces agregamos el producto al arreglo.
            } else {
                nuevoCarrito.push(
                    {
                        id: idProductoAAgregar,
                        nombre: nombre,
                        price: price,
                        type: type,
                        cantidad: 1
                    }
                );
            }
            // Por ultimo actualizamos el carrito.
            cambiarCarrito(nuevoCarrito);
        }
    }
    async function addToCart(data) {
        try {
            let result = await (await fetch("http://localhost:4000/api/addToCart", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('Added To Cart');
            getCart()
        }
        } catch (error) {
            console.log(error)
        }
    }
    async function addToFavourites(data) {
        let result = await (await fetch("http://localhost:4000/api/addToFavourites", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('Added To addToFavourites');
            getFavourites()
        }
    }
    const agregarProductoAlCarritoFav = (idProductoAAgregar, nombre, price, type) => {
        let data
        if (user && isLoggedIn) {
            data = {
                id: idProductoAAgregar,
                name: nombre,
                price: price,
                type: type,
                email: user
            }
        } else {
            alert('Kindly Login to add to Favourites')
        }

        if (data) {
            addToFavourites(data)
        }
        // Si el carrito no tiene elementos entonces agregamos uno.
        if (carritoFav.length === 0) {
            cambiarCarritoFav([{ id: idProductoAAgregar, nombre: nombre, price: price, type: type, cantidad: 1 }]);
        } else {
            // De otra foma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar.
            // Si ya lo tiene entonces queremos actualizar su valor.
            // Si no tiene el producto entonces lo agregamos.

            // Para poder editar el arreglo tenemos que clonarlo.
            const nuevoCarritoFav = [...carritoFav];

            // Comprobamos si el carrito ya tiene el ID del producto a agregar.
            const yaEstaEnCarritoFav = nuevoCarritoFav.filter((productoDeCarritoFav) => {
                return productoDeCarritoFav.id === idProductoAAgregar
            }).length > 0;

            // Si ya tiene el producto entonces lo tenemos que actualizar.
            if (yaEstaEnCarritoFav) {
                // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                // Y en base a su posicion ya actualizamos el valor.
                nuevoCarritoFav.forEach((productoDeCarritoFav, index) => {
                    if (productoDeCarritoFav.id === idProductoAAgregar) {
                        const cantidad = nuevoCarritoFav[index].cantidad;
                        nuevoCarritoFav[index] = {
                            id: idProductoAAgregar,
                            nombre: nombre,
                            price: price * (cantidad + 1),
                            type: type,
                            cantidad: cantidad + 1
                        }
                    }
                });
                // De otra forma entonces agregamos el producto al arreglo.
            } else {
                nuevoCarritoFav.push(
                    {
                        id: idProductoAAgregar,
                        nombre: nombre,
                        price: price,
                        type: type,
                        cantidad: 1
                    }
                );
            }
            // Por ultimo actualizamos el carrito.
            cambiarCarritoFav(nuevoCarritoFav);
        }
    }

    async function removeFromCart(id) {

        let result = await (await fetch("http://localhost:4000/api/removeFromCart/" + id, {

            // Adding method type
            method: "DELETE",

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('Item Removed')
            getCart()
        }
    }
    async function removeFromFavourites(id) {

        let result = await (await fetch("http://localhost:4000/api/removeFromFavourites/" + id, {

            // Adding method type
            method: "DELETE",

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('removeFromFavourites Removed')
            getFavourites()
        }
    }
    const removeItemFromCart = (id) => {

        removeFromCart(id)
        let data = carrito && carrito.filter(item => item.id !== id)
        cambiarCarrito(data)
    }

    const removeItemFromCartFav = (id) => {
        removeFromFavourites(id)
        let data = carritoFav && carritoFav.filter(item => item.id !== id)
        cambiarCarritoFav(data)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('email')
        console.log('token', token)
        console.log('user', user)
        if (token && user) {
            setIsLoggedIn(true)
            setUser(user)
        }

        if (user) {
            getCart()
            getFavourites()
        }
    }, [user, isLoggedIn])

    const handleLogout = () => {
        setUser()
        setIsLoggedIn(false)
        setCart([])
        setCartProducts([])
        setFavourites([])
        setFavProducts([])
        localStorage.clear();
        history?.push('/login')
    }

    const increment = (id, quantity) => {
        let newQuantity = quantity + 1
        updateQuantity(id, newQuantity)
    }

    const decrement = (id, quantity) => {
        let newQuantity = quantity - 1

        if (newQuantity > 0) {
            updateQuantity(id, newQuantity)
        } else {
            alert('Sorry! Quantity cannot be less than 1')
        }
    }

    async function updateQuantity(id, quantity) {


        let result = await (await fetch(`http://localhost:4000/api/updateQuantity/${id}/${quantity}`, {

            // Adding method type
            method: "PUT",

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })).json()
        console.log(result);
        if (result) {
            console.log('quantity')
            getCart()
        }

    }
    return (
        <>
            <BrowserRouter>
                <Menubar count={cart?.length} countFav={favourites?.length} handleLogout={handleLogout} isLoggedIn={isLoggedIn} user={user} />
                <div className="mx-auto text-center" >
                    <img src={process.env.PUBLIC_URL + `/Assets/banner.png`} alt="logo" className="img-fluid" />
                </div>
                <div className="container mb-5" style={{ height: "100%" }}>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/mobiles">
                            <Mobiles agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cartProducts} favProducts={favProducts}/>
                        </Route>
                        <Route path="/headphones">
                            <Headphones agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cartProducts} favProducts={favProducts}/>
                        </Route>
                        <Route path="/laptops">
                            <Laptops agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cartProducts} favProducts={favProducts}/>
                        </Route>
                        <Route path="/checkout">
                            <Checkout carrito={carrito} carritoFav={carritoFav} removeItemFromCart={removeItemFromCart} increment={increment} decrement={decrement} removeItemFromCartFav={removeItemFromCartFav} clearCart={clearCart} clearCartFav={clearCartFav} getCart={getCart} cart={cart} />
                        </Route>
                        <Route path="/favorite">
                            <Favorite carrito={carrito} carritoFav={favourites} removeItemFromCart={removeItemFromCart} removeItemFromCartFav={removeItemFromCartFav} clearCart={clearCart} clearCartFav={clearCartFav} />
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login signIn={() => setIsLoggedIn(true)} saveUser={(data) => setUser(data)} />
                        </Route>
                        <Route path="/register" exact={true} component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
            <div style={{ position: "relative", left: "0", bottom: "0", right: "0", height: "auto" }}>
                <Footer />
            </div>
        </>
    );
}

export default App;

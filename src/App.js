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
import Order from './componentes/Order';
import { apiURL } from './Utils/ApiUrl';

const App = () => {
    const [cart, setCart] = useState([])
    const [favourites, setFavourites] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState()
    const history = useHistory()
    const [cartProducts, setCartProducts] = useState([])
    const [favProducts, setFavProducts] = useState([])

    async function simpleFetch(url) {
        return await (await fetch(url)).json();
    }

    async function getCart() {
        try {
            let response = await simpleFetch(apiURL + 'api/cart/' + user)
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
            let response = await simpleFetch(apiURL + 'api/favourites/' + user)
            if (response) {
                setFavourites(response)
                let names = response.map(a => a.name)
                setFavProducts(names)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clearCart = () => {
        setCart([])
        setCartProducts([])
        emptyCart(user)
    }
    const clearFav = () => {
        setFavourites([])
        setFavProducts([])
        emptyFavourites(user)
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
            alert('Logga in to add to cart')
        }

        if (data) {
            addToCart(data)
        }
    }
    async function addToCart(data) {
        try {
            let result = await (await fetch(apiURL + "api/addToCart", {

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
        let result = await (await fetch(apiURL + "api/addToFavourites", {

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
    }

    async function removeFromCart(id) {

        let result = await (await fetch(apiURL + "api/removeFromCart/" + id, {

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
    async function emptyCart(email) {

        let result = await (await fetch(apiURL + "api/emptyCart/" + email, {
            // Adding method type
            method: "DELETE",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('Cart Empty')
            getCart()
        }
    }
    async function removeFromFavourites(id) {

        let result = await (await fetch(apiURL + "api/removeFromFavourites/" + id, {

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
    async function emptyFavourites(email) {

        let result = await (await fetch(apiURL + "api/emptyFavourites/" + email, {

            // Adding method type
            method: "DELETE",

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })).json()
        console.log(result);
        if (result) {
            console.log('empty Favourites')
            getFavourites()
        }
    }
    const removeItemFromCart = (id) => {
        removeFromCart(id)
    }

    const removeItemFromCartFav = (id) => {
        removeFromFavourites(id)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            removeItemFromCart(id)
        }
    }

    async function updateQuantity(id, quantity) {


        let result = await (await fetch(`${apiURL}api/updateQuantity/${id}/${quantity}`, {

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
                            <Checkout removeItemFromCart={removeItemFromCart} increment={increment} decrement={decrement} removeItemFromCartFav={removeItemFromCartFav} clearCart={clearCart} getCart={getCart} cart={cart} />
                        </Route>
                        <Route path="/favorite">
                            <Favorite carritoFav={favourites} removeItemFromCart={removeItemFromCart} removeItemFromCartFav={removeItemFromCartFav} clearFav={clearFav} />
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login signIn={() => setIsLoggedIn(true)} saveUser={(data) => setUser(data)} />
                        </Route>
                        <Route path="/register" exact={true} component={Register} />
                        <Route path="/order" exact={true} component={Order} />
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

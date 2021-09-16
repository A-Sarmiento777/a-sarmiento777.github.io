import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
const App = () => {

    const [count, setCount] = useState(0);
    const [carrito, cambiarCarrito] = useState([]);
    const [carritoFav, cambiarCarritoFav] = useState([]);
    const [countFav, setCountFav] = useState(0);

    //update count productos
    useEffect(() => {
        contar(carrito);
        contarFav(carritoFav);
    }, [carrito,carritoFav])

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

    const agregarProductoAlCarrito = (idProductoAAgregar, nombre, price, type) => {
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

    const agregarProductoAlCarritoFav = (idProductoAAgregar, nombre, price, type) => {
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

    const removeItemFromCart = (id) => {
        let data = carrito && carrito.filter(item => item.id !== id)
        cambiarCarrito(data)
    }

    const removeItemFromCartFav = (id) => {
        let data = carritoFav && carritoFav.filter(item => item.id !== id)
        cambiarCarritoFav(data)
    }

    return (
        <>
            <BrowserRouter>        
                <Menubar count={count} countFav={countFav} />
                <div className="mx-auto text-center" > 
                    <img src={process.env.PUBLIC_URL + `/Assets/banner.png`} alt="logo" className="img-fluid"/>
                </div> 
                <div className="container mb-5" style={{ height:"100%" }}>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/mobiles">
                            <Mobiles agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} />
                        </Route>
                        <Route path="/headphones">
                            <Headphones agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav}/>
                        </Route>
                        <Route path="/laptops">
                            <Laptops agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} />
                        </Route>                
                        <Route path="/checkout">
                            <Checkout carrito={carrito} carritoFav={carritoFav} removeItemFromCart={removeItemFromCart} removeItemFromCartFav={removeItemFromCartFav} clearCart={clearCart} clearCartFav={clearCartFav} />
                        </Route>
                        <Route path="/favorite">
                            <Favorite carrito={carrito} carritoFav={carritoFav} removeItemFromCart={removeItemFromCart} removeItemFromCartFav={removeItemFromCartFav} clearCart={clearCart} clearCartFav={clearCartFav} />
                        </Route>                        
                        <Route path="/login" exact={true} component={Login} />
                        <Route path="/register" exact={true} component={Register} />
                    </Switch>               
                </div>
            </BrowserRouter>
            <div style={{ position:"relative", left:"0", bottom:"0", right:"0", height: "auto" }}>
                <Footer  />
            </div>
        </>
    );
}

export default App;

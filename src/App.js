import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './componentes/Home';
import Mobiles from './componentes/Mobiles';
import Carrito from './componentes/Carrito';
import Headphones from './componentes/Headphones';
import Laptops from './componentes/Laptops';
import Checkout from './componentes/Checkout';

const App = () => {

    const [hide, setHide] = useState(false)
    const productos = [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
        { id: 3, nombre: 'Producto 3' },
        { id: 4, nombre: 'Producto 4' }
    ];

    const hideCart = () => {
        setHide(true)
    }
    const unHideCart = () => {
        setHide(false)
    }
    const clearCart = () => {
        cambiarCarrito([])
    }
    const [carrito, cambiarCarrito] = useState([]);
    // [
    //     {id: 1s, nombre: 'Producto 1ss', cantidadj: 1},
    //     {id: 2, nombre: 'Producto 2', cantidad: 2}
    // ]

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

    const removeItemFromCart = (id) => {
        let data = carrito && carrito.filter(item => item.id !== id)
        cambiarCarrito(data)
    }

    return (

        <BrowserRouter>
            <Container>
                <Menu >
                    <NavLink to="/" onClick={hideCart}>Home</NavLink>
                    <NavLink to="/mobiles" onClick={unHideCart}>Mobiles</NavLink>
                    <NavLink to="/headphones" onClick={unHideCart}> Headphones</NavLink>
                    <NavLink to="/laptops" onClick={unHideCart}> Laptops</NavLink>
                    <NavLink to="/checkout" onClick={hideCart}> <img src={process.env.PUBLIC_URL + `/Assets/shopping-cart.png`} width='30' /></NavLink>
                </Menu>
                <main>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/mobiles">
                            <Mobiles agregarProductoAlCarrito={agregarProductoAlCarrito} />
                        </Route>
                        <Route path="/headphones">
                            <Headphones agregarProductoAlCarrito={agregarProductoAlCarrito} />
                        </Route>
                        <Route path="/laptops">
                            <Laptops agregarProductoAlCarrito={agregarProductoAlCarrito} />
                        </Route>
                    
                        <Route path="/checkout">
                            <Checkout carrito={carrito} removeItemFromCart={removeItemFromCart} clearCart={clearCart} />
                        </Route>
                        
                    </Switch>
                </main>
                {hide ?
                    null : <aside>
                        <Carrito carrito={carrito} hideCart={hideCart} />
                    </aside>}
            </Container>
        </BrowserRouter>
    );
}

const Container = styled.div`
    max-width: 100%;
    padding: 40px;
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;   
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 60px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;

export default App;
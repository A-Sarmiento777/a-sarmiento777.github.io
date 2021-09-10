import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Carrito = ({ carrito, hideCart }) => {
	let amount = carrito?.map(a => a.price)
	let totalAmount = amount?.reduce((a, b) => a + b, 0)
	return (
		<div>
			<h3>Shopping cart</h3>

			{carrito.length > 0 ?
				carrito.map((producto, index) => {
					return (
						<Producto key={index}>
							<NombreProducto>
								{producto.nombre}
							</NombreProducto>
							<div>Price: {producto.price+' kr'}</div>
							<div>Quantity: {producto.cantidad}</div>

							<img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.nombre}.jpg`} width='150' />

						</Producto>
					);
				})
				:
				<p>You have not add any item yet</p>
			}

			{carrito.length ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
				<div>
				Price: {totalAmount - ((totalAmount * 25) / 100) +' kr'}
				</div>
				<div>
				Incl moms : {totalAmount+' kr'}
				</div>
				<div>
					<Link to='/checkout'>
						<button style={{ backgroundColor: 'black', color: 'white' }} onClick={hideCart}>Checkout</button>
					</Link>

				</div>
			</div>: null}

		</div >
	);
}

const Producto = styled.div`
	padding: 10px;
	border-bottom: 1px solid #ebebf3;
	font-size: 14px;
`;

const NombreProducto = styled.p`
	font-weight: bold;
	font-size: 16px;
	color: #000;
`;

export default Carrito;
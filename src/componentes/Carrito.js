import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiURL } from '../Utils/ApiUrl';

const Carrito = ({ carrito, hideCart }) => {
	
	const [cart, setCart] = useState([])
	
	let amount = cart?.map(a => a.price)
	let totalAmount = amount?.reduce((a, b) => a + b, 0)
	useEffect(() => {
		getCart()
	}, [])

	async function simpleFetch(url) {

		return await (await fetch(url)).json();

	}

	async function getCart() {
		try {
			let response = await simpleFetch(apiURL + 'api/cart')
			if (response) {
				setCart(response)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="card mb-3 pb-4 bg-transparent">
			<h3>Shopping cart</h3>

			<div className="d-flex flex-wrap justify-content-center ">
				{cart.length > 0 ?
					cart.map((producto, index) => {
						return (
							<div key={index} className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{width:"200px", minWidth:"30px"}}>
								<div className="h6">{producto?.name}</div>
								<div className="h6"> <small> Price: {producto?.price} kr </small></div>
								<div>Quantity: {producto?.quantity}</div>
								<div className="mx-auto">
									<img src={process.env.PUBLIC_URL + `/Assets/${producto.type}/${producto.name}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
								</div>
							</div> 		
						);
					})
					:
					<p>You have not add any item yet</p>
				}     						
			</div> 
			{carrito.length ? <div className="text-center ">
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

export default Carrito;

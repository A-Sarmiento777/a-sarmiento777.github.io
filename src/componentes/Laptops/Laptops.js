import React, { useEffect, useState } from 'react';
//import { apiURL } from '../../Utils/ApiUrl';
import Laptop from '../Laptop/Laptop';

const Laptops = ({agregarProductoAlCarrito, agregarProductoAlCarritoFav, removeItemFromCartFav, cart, favProducts}) => {
	const [laptops, setLaptops] = useState([])

	useEffect(() => {
		async function getLaptops() {
			try {
				//let response = await simpleFetch(apiURL + 'api/laptops')
				let response = await simpleFetch('/api/laptops')
				if (response) {
					setLaptops(response)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getLaptops()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function simpleFetch(url) {
		return await (await fetch(url)).json();
	}
	return (
		<div className="pt-4 text-center"> 
			<h1>Laptops</h1>
			
			<div className="d-flex flex-wrap justify-content-center">
			{laptops && laptops.map( (laptop, index) => {
				return (
					<Laptop agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cart} favProducts={favProducts} laptop={laptop}/>
				)
			})}
			</div>
			</div>
	);
}
 
export default Laptops;
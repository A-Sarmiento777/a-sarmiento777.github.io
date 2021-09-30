import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { apiURL } from '../Utils/ApiUrl';

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
					<div key={index} className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{width:"200px", minWidth:"30px"}}>
						<div className="h6">{laptop?.name}</div>
						<div className="h6"> <small> Price: {laptop?.price} $ </small></div>
						<div className="mx-auto">
							<img src={process.env.PUBLIC_URL + `/Assets/laptops/${laptop?.name}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
						</div>
						<div>
						{favProducts?.includes(laptop?.name) ? <button className="bg-light border-0"  onClick={() => removeItemFromCartFav(laptop.id + 'l')}>
								<img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width='20' alt="logo"/>
							</button> : <button className="bg-light border-0" onClick={() => agregarProductoAlCarritoFav(laptop?.id + 'l', laptop?.name, laptop?.price, 'laptops')}>
						<img src={process.env.PUBLIC_URL + `/Assets/fav.png`} width='20' alt="logo"/>
						</button>}
							{cart?.includes(laptop?.name) ? <Link to='/checkout'><button className='bg-success px-1 rounded ml-2'>View Cart</button></Link> : <button className="bg-warning px-1 rounded ml-2"  onClick={() => agregarProductoAlCarrito(laptop?.id + 'l', laptop?.name, laptop?.price, 'laptops', 1)}>Add</button>}
						</div>
					</div>
				)
			})}
			</div>
			</div>
	);
}
 
export default Laptops;
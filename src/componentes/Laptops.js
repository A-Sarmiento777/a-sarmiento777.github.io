import React, { useEffect, useState } from 'react';

const Laptops = ({agregarProductoAlCarrito, agregarProductoAlCarritoFav}) => {
	const [laptops, setLaptops] = useState([])

	useEffect(() => {
		getLaptops()
	}, [])

	async function simpleFetch(url) {

		return await (await fetch(url)).json();

	}

	async function getLaptops() {
		try {
			let response = await simpleFetch('http://localhost:4000/api/laptops')
			if (response) {
				setLaptops(response)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="pt-4 text-center"> 
			<h1>Laptops</h1>
			
			<div className="d-flex flex-wrap justify-content-center">
			{laptops && laptops.map( (laptop, index) => {
				return (
					<div key={index} className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{width:"200px", minWidth:"30px"}}>
						<div className="h6">{laptop?.name}</div>
						<div className="h6"> <small> Price: {laptop?.price} kr </small></div>
						<div className="mx-auto">
							<img src={process.env.PUBLIC_URL + `/Assets/laptops/${laptop?.name}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
						</div>
						<div>
						<button className="bg-light border-0" onClick={() => agregarProductoAlCarritoFav(laptop?.id + 'm', laptop?.name, laptop?.price, 'laptops')}>
						<img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width='20' alt="logo"/>
						</button>
							<button className="bg-warning px-1 rounded ml-2"  onClick={() => agregarProductoAlCarrito(laptop?.id + 'l', laptop?.name, laptop?.price, 'laptops', 1)}>Add</button>
						</div>
					</div>
				)
			})}
			</div>
			</div>
	);
}
 
export default Laptops;
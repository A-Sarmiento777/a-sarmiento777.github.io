import React, { useEffect, useState } from 'react';

const Laptops = ({agregarProductoAlCarrito}) => {
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
		<div>
			<h1>Laptops</h1>
			
			<div style={{display: 'flex', alignItems: 'center'}}>
			{laptops && laptops.map(laptop => {
				return (
					<div style={{width: '50%'}}>
						<div style={{fontSize: '18px', fontWeight: 'bold'}}>{laptop?.name}</div>
						<div>Price: {laptop?.price} kr</div>
						<img src={process.env.PUBLIC_URL + `/Assets/laptops/${laptop?.name}.jpg`} width='150' />
						<div>
						<button style={{backgroundColor: 'yellow', padding: '8px 14px'}} onClick={() => agregarProductoAlCarrito(laptop?.id + 'l', laptop?.name, laptop?.price, 'laptops')}>Add</button>
						</div>
					</div>
				)
			})}
			</div>
			</div>
	);
}
 
export default Laptops;
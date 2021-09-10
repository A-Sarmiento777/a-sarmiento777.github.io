import React, { useEffect, useState } from 'react';



const Headphones = ({agregarProductoAlCarrito}) => {

	const [headphones, setHeadphones] = useState([])

	useEffect(() => {
		getHeadphones()
	}, [])

	async function simpleFetch(url) {

		return await (await fetch(url)).json();

	}

	async function getHeadphones() {
		try {
			let response = await simpleFetch('http://localhost:4000/api/headphones')
			if (response) {
				setHeadphones(response)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<h1>Headphones</h1>
			<div style={{display: 'flex', alignItems: 'center'}}>
			{headphones && headphones.map(headphone => {
				return (
					<div style={{width: '50%'}}>
						<div style={{fontSize: '18px', fontWeight: 'bold'}}>{headphone?.name}</div>
						<div>Price: {headphone?.price} kr</div>
						<img src={process.env.PUBLIC_URL + `/Assets/headphones/${headphone?.name}.jpg`} width='150' />
						<div>
						<button style={{backgroundColor: 'yellow', padding: '8px 14px'}} onClick={() => agregarProductoAlCarrito(headphone?.id + 'h', headphone?.name, headphone?.price, 'headphones')}>Add</button>
						</div>
					</div>
				)
			})}
			</div>
			</div>
	);
}
 
export default Headphones;
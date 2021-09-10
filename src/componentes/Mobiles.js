import React, { useEffect, useState } from 'react';

const Mobiles = ({agregarProductoAlCarrito}) => {


	const [mobiles, setMobiles] = useState([])

	useEffect(() => {
		getMobiles()
	}, [])

	async function simpleFetch(url) {

		return await (await fetch(url)).json();

	}

	async function getMobiles() {
		try {
			let response = await simpleFetch('http://localhost:4000/api/mobiles')
			if (response) {
				setMobiles(response)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div>
			<h1>Mobiles</h1>

			<div style={{display: 'flex', alignItems: 'center'}}>
			{mobiles && mobiles.map(mobile => {
				return (
					<div style={{width: '50%'}}>
						<div style={{fontSize: '18px', fontWeight: 'bold'}}>{mobile?.name}</div>
						<div>Price: {mobile?.price} kr</div>
						<img src={process.env.PUBLIC_URL + `/Assets/mobiles/${mobile?.name}.jpg`} width='150' />
						<div>
						<button style={{backgroundColor: 'yellow', padding: '8px 14px'}} onClick={() => agregarProductoAlCarrito(mobile?.id + 'm', mobile?.name, mobile?.price, 'mobiles')}>Add</button>
						</div>
					</div>
				)
			})}
			</div>
		</div>
	);
}

export default Mobiles;
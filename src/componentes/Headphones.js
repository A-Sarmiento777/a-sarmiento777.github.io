import React, { useEffect, useState } from 'react';



const Headphones = ({agregarProductoAlCarrito,agregarProductoAlCarritoFav}) => {

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
		<div className="pt-4 text-center">
			<h1>Headphones</h1>
			<div className="d-flex flex-wrap justify-content-center">
			{headphones && headphones.map( (headphone, index) => {
				return (
					<div key={index} className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{width:"200px", minWidth:"30px"}}>
						<div className="h6">{headphone?.name}</div>
						<div className="h6"><small> Price: {headphone?.price} kr </small></div>
						<div className="mx-auto">
							<img src={process.env.PUBLIC_URL + `/Assets/headphones/${headphone?.name}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
						</div>
						<div>
							<button className="bg-light border-0" onClick={() => agregarProductoAlCarritoFav(headphone?.id + 'm', headphone?.name, headphone?.price, 'headphones')}>
							<img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width='20' alt="logo"/>
								</button>
							<button className="bg-warning px-1 rounded ml-2" onClick={() => agregarProductoAlCarrito(headphone?.id + 'h', headphone?.name, headphone?.price, 'headphones', 1)}>Add</button>
						</div>
					</div>
				)
			})}
			</div>
			</div>
	);
}
 
export default Headphones;
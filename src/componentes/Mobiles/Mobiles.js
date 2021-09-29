import React, { useEffect, useState } from 'react';
import { apiURL } from '../../Utils/ApiUrl';
import Mobile from '../Mobile/Mobile';

const Mobiles = ({agregarProductoAlCarrito, agregarProductoAlCarritoFav, removeItemFromCartFav, cart, favProducts}) => {
	const [mobiles, setMobiles] = useState([])

	useEffect(() => {
		async function getMobiles() {
			try {
				let response = await simpleFetch(apiURL + 'api/mobiles')
				if (response) {
					setMobiles(response)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getMobiles()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function simpleFetch(url) {
		return await (await fetch(url)).json();
	}

	return (
		<div className="pt-4 text-center">
			<h1>Mobiles</h1>
			<div className="d-flex flex-wrap justify-content-center">
			{mobiles && mobiles.map((mobile, index) => {
				return (
					<Mobile key={index + 1} agregarProductoAlCarrito={agregarProductoAlCarrito} agregarProductoAlCarritoFav={agregarProductoAlCarritoFav} removeItemFromCartFav={removeItemFromCartFav} cart={cart} favProducts={favProducts} mobile={mobile}/>
				)
			})}
			</div>
		</div>
	);
}

export default Mobiles;
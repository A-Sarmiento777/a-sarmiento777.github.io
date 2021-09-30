import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiURL } from '../Utils/ApiUrl';


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
					<div key={index + 1} className="card mr-4 mb-4 p-3 shadow p-3 mb-5 bg-white rounded " style={{width:"200px", minWidth:"30px"}}>
						<div className="h6">{mobile?.name}</div>
						<div className="h6"> <small> Price: {mobile?.price} $ </small></div>
						<div className="mx-auto">
							<img src={process.env.PUBLIC_URL + `/Assets/mobiles/${mobile?.name}.jpg`} width='150' alt="logos" className="img-fluid py-2" />
						</div>
						<div>
							{favProducts?.includes(mobile?.name) ? <button className="bg-light border-0"  onClick={() => removeItemFromCartFav(mobile.id + 'm')}>
								<img src={process.env.PUBLIC_URL + `/Assets/heart.png`} width='20' alt="logo"/>
							</button> : <button className="bg-light border-0"  onClick={() => agregarProductoAlCarritoFav(mobile?.id + 'm', mobile?.name, mobile?.price, 'mobiles')}>
								<img src={process.env.PUBLIC_URL + `/Assets/fav.png`} width='20' alt="logo"/>
							</button>}
							{cart?.includes(mobile?.name) ? <Link to='/checkout'><button className='bg-success px-1 rounded ml-2'>View Cart</button></Link> : <button className="bg-warning px-1 rounded ml-2" onClick={() => agregarProductoAlCarrito(mobile?.id + 'm', mobile?.name, mobile?.price, 'mobiles', 1)}>Add</button>}
						</div>
					</div>
				)
			})}
			</div>
		</div>
	);
}

export default Mobiles;
import React from 'react';

const Home = () => {
	return (		
			<div className="row py-5">
				<div className="col">
					<div className="border-bottom">
						<h1 className="text-center"> Våra produkter</h1>
					</div>			
			</div>
			
			<div className="row">
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/HP_Pavilion_17.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">HP Pavilion 17</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">										
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/Doro 8080.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">Doro 8080</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/Acer Swift 3.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">Acer Swift 3</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/IphoneSE.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">IPhone SE</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/MSI GF63.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">MSI GF63</h3>
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/HuaweiP40lite.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">Huawei P40 Lite</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/Apple AirPods 2019.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">Apple Airpods 2019</h3>
							
						</div>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-lg-3 mb-4 mt-5">
					<div className="card ">
						<img src={process.env.PUBLIC_URL + `/Assets/home-list/Apple AirPods Max.jpg`} alt="hello" className="card-img-top" />
						<div className="card-body">
							<h3 className="card-title">Apple Airpods Max</h3>
							
						</div>
					</div>
				</div>
         
			</div>

			</div>
		
	);
}

export default Home;
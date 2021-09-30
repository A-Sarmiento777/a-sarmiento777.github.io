import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { apiURL } from '../Utils/ApiUrl';
import './loginregister.css';
const Register = (props) => {

	//State para iniciar sesion
	const [usuario, guardarUsuario] = useState({

		name: '',
		email: '',
		password: '',
		confirm: ''

	});

	//extraer usuario

	const { name, email, password, confirm } = usuario;
	const onChange = e => {
		guardarUsuario({

			...usuario,
			[e.target.name]: e.target.value
		})
	}

	//Cuando el usuario quiere iniciar sesion

	function register(data) {
		try {
			//fetch(apiURL + "api/register", {
			fetch("/api/register", {

				// Adding method type
				method: "POST",

				// Adding body or contents to send
				body: JSON.stringify(data),

				// Adding headers to the request
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})

				// Converting to JSON
				.then(response => response.status === 200 ? props.history.push('/login') : alert('Registration Failed'))

			// Displaying results to console
			//.then(json => console.log('json', json));
		} catch (error) {
			console.log(error)
		}
	}

	const onSubmit = e => {
		e.preventDefault();
		console.log(usuario)
		if (usuario.password !== usuario.confirm) {
			alert('Password doesnot match !!!')
		} else {
			register(usuario)
		}
		//Validar que no haya campos vacios

		//password minimo de 6 caracteres

		//los dos passwords son iguales

		//Pasarlo al action
	}
	return (
		<div className="container d-flex justify-content-center mt-5"  >
			<div className="card col-4 shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ minWidth: "300px" }}>
				<h1 className="pb-3">Register</h1>
				<form
					onSubmit={onSubmit}
				>
					<div className="form-group">
						<label className="col-12 text-left pl-1" htmlFor="name">User name</label>
						<input
							className="form-control"
							type="text"
							id="name"
							name="name"
							placeholder="Your name"
							value={name}
							onChange={onChange} />
					</div>

					<div lassName="form-group">
						<label className="col-12 text-left pl-1" htmlFor="email">Email</label>
						<input
							className="form-control"
							type="email"
							id="email"
							name="email"
							placeholder="Your email"
							value={email}
							onChange={onChange} />
					</div>

					<div lassName="form-group">
						<label className="col-12 text-left pl-1" htmlFor="password">Password</label>
						<input
							className="form-control"
							type="password"
							id="password"
							name="password"
							placeholder="Your password"
							minlength='8'
							value={password}
							onChange={onChange} />
					</div>

					<div lassName="form-group">
						<label className="col-12 text-left pl-1" htmlFor="confirm">Repeate password</label>
						<input
							className="form-control"
							type="password"
							id="confirm"
							name="confirm"
							minlength='8'
							placeholder="Confirm your password"
							value={confirm}
							onChange={onChange} />
					</div>

					<div className="form-group">
						<input type="submit" className="btn btn-primary inline col-12 py-2"
							value="Register" />
					</div>
				</form>

				<Link to={'/'}>
					Back to home
				</Link>
			</div>
		</div>
	);
}

export default Register;
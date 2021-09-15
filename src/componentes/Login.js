import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './loginregister.css';

const Login = (props) => {

	//State para el login

	const [usuario, guardarUsuario] = useState ( {

		email: '',
		password: ''
	});

	//extraer user

	const {email, password}= usuario;
	const onChange = e =>{
		guardarUsuario({

			...usuario, 
			[e.target.name]: e.target.value
		})
	}

	//Cuando el usuario quiere iniciar sesion

	const onSubmit = e =>
	{
		e.preventDefault ();
		console.log(usuario)
		login(usuario)
		//Validar que no haya campos vacios

		//Pasarlo al action
	}

	function login(data) {
		try {
			fetch("http://localhost:4000/api/login", {

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
				.then(response => response.status == 200 ? props.history.push('/') : alert('Error While Logging In'))

			// Displaying results to console
			//.then(json => console.log('json', json));
		} catch (error) {
			console.log(error)
		}
	}
	return (
	<div className = "container d-flex justify-content-center mt-5" >
		<div className = "card col-4 shadow-lg p-3 mb-5 bg-white rounded text-center" style={{minWidth:"300px"}} >
			<h2 className="pb-3">Log in</h2>
			<form
            onSubmit={onSubmit}
            >
				<div className ="form-group">
					<label for="exampleInputEmail1" className ="col-12 text-left pl-1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						placeholder=" Write your email"
						value={email}
						onChange={onChange}
					/>
				</div>

				<div className ="form-group">
					<label for="exampleInputPassword1" className ="col-12 text-left pl-1">Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						placeholder="Write a password"
						value ={password}
						onChange={onChange}
					/>
				</div>

				<div className ="form-group">
					<input type= "submit" className= "btn btn-primary inline col-12 py-2"
					value ="Log in" />
				</div>
			</form>

			<Link to = {'/register'} className = "enlace-cuenta">
				Register
			</Link>
			</div> 
	</div>
	);
}
 
export default Login;
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './loginregister.css';

const Login = () => {

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

		//Validar que no haya campos vacios

		//Pasarlo al action
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
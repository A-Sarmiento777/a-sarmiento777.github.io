import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './loginregister.css';

const Login = () => {

	//State para iniciar sesion

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
	<div className = "form-usuario" >
		<div className = "contenedor-form sombra dark">
			<h1>Log in</h1>
			<form
            onSubmit={onSubmit}
            >
				<div className ="campo-form">
					<label htmlFor="email">Email</label>
					<input
					type="email"
					id="email"
					name="email"
					placeholder="Your email"
					value={email}
					onChange={onChange}/>
				</div>

				<div className ="campo-form">
					<label htmlFor="password">Password</label>
					<input
					type="password"
					id="password"
					name="password"
					placeholder="Your password"
					value ={password}
					onChange={onChange}/>
				</div>

				<div className ="campo-form">
					<input type= "submit" className= "btn btn-primario btn block"
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
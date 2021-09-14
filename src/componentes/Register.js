import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './loginregister.css';
const Register = () => {

	//State para iniciar sesion

	const [usuario, guardarUsuario] = useState ( {

		name:'',
        email: '',
		password: '',
        confirm: ''
        
	});

	//extraer usuario

	const {name,email, password, confirm}= usuario;
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

        //password minimo de 6 caracteres

        //los dos passwords son iguales

		//Pasarlo al action
	}
	return (
	<div className = "form-usuario" >
		<div className = "contenedor-form sombra dark">
			<h1>Register</h1>
			<form
            onSubmit={onSubmit}
            >
                <div className ="campo-form">
					<label htmlFor="name">User name</label>
					<input
					type="text"
					id="name"
					name="name"
					placeholder="Your name"
					value={name}
					onChange={onChange}/>
				</div>

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
					<label htmlFor="confirm">Repeate password</label>
					<input
					type="password"
					id="confirm"
					name="confirm"
					placeholder="Confirm your password"
					value ={confirm}
					onChange={onChange}/>
				</div>

				<div className ="campo-form">
					<input type= "submit" className= "btn btn-primario btn block"
					value ="Register" />
				</div>
			</form>

			<Link to = {'/'}>
				Back to home
			</Link>
			</div> 
	</div>
	);
}
 
export default Register;
import React from 'react';
import { NavLink} from 'react-router-dom';

const Menu = ({count, countFav}) => {
	return (
            <nav className="navbar navbar-expand-md navbar-dark bg-light" style={{minWidth:"400px"}}>
                <div className="container">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">

                    <h2 className="mr-5">VenCub</h2>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link active" style={{color:"black"}} to="/" > Home <span className="sr-only">(current)</span> </NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" style={{color:"black"}} to="/mobiles" >Mobiles</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" style={{color:"black"}}  to="/headphones" > Headphones</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" style={{color:"black"}}  to="/laptops" > Laptops</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="mr-auto order-0">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link d-flex"  to="/favorite"> 
                                <div className="mt-auto" style={{color:"black"}}> 
                                    {  countFav } 
                                </div>
                                <img src={process.env.PUBLIC_URL + `/Assets/fav.png`} width='30' alt="logo"/> 
                            </NavLink>
                        </li>                        
                        <li className="nav-item active">
                            <NavLink className="nav-link d-flex"  to="/checkout"> 
                                <div className="mt-auto" style={{color:"black"}}> 
                                    {  count } 
                                </div>
                                <img src={process.env.PUBLIC_URL + `/Assets/shopping-cart.png`} width='30' alt="logo"/> 
                            </NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/login"> 
                                <img src={process.env.PUBLIC_URL + `/Assets/login.png`} width='30' alt="logo" /> 
                            </NavLink>
                        </li> 
                    </ul>
                </div>
                </div>
            </nav>       

	);
}

export default Menu;

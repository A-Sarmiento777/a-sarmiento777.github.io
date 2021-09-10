import React from 'react';
import styled from 'styled-components';

const Productos = ({productos, agregarProductoAlCarrito}) => {
	return (
		<div>
			
			<ContenedorProductos>
				{productos.map((producto, index) => {
					return(
						<Producto key={index}>
							<p>{producto.nombre}</p>
							
								onClick={() => agregarProductoAlCarrito(producto.id, producto.nombre)}
							
						</Producto>
					);
				})}
			</ContenedorProductos>
		</div>
	);
}

const ContenedorProductos = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px 0;
`;
 
export default Productos;
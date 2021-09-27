// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Laptop from "../Laptop";

test("Laptop Card test", () => {
  const agregarProductoAlCarrito = jest.fn(() => 1);

  let testRenderer = renderer.create(
    <Laptop
      agregarProductoAlCarrito={agregarProductoAlCarrito}
      agregarProductoAlCarritoFav={() => {}}
      removeItemFromCartFav={() => {}}
      cart={[]}
      favProducts={[]}
      laptop={{ id: 1, name: "Test", price: "6.7" }}
    ></Laptop>
  );

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[3].children[1].props.onClick();

  expect(agregarProductoAlCarrito).toHaveBeenCalled();
  expect(agregarProductoAlCarrito).toBeCalledTimes(1);

  testRenderer.update(
    <Router>
      <Laptop
        agregarProductoAlCarrito={agregarProductoAlCarrito}
        agregarProductoAlCarritoFav={() => {}}
        removeItemFromCartFav={() => {}}
        cart={["Test"]}
        favProducts={[]}
        laptop={{ id: 1, name: "Test", price: "6.7" }}
      ></Laptop>
    </Router>
  );

  tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

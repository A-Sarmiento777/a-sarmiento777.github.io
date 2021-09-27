// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Headphone from "../Headphone";

test("Headphone Card test", () => {
  const agregarProductoAlCarrito = jest.fn(() => 1);

  let testRenderer = renderer.create(
    <Headphone
      agregarProductoAlCarrito={agregarProductoAlCarrito}
      agregarProductoAlCarritoFav={() => {}}
      removeItemFromCartFav={() => {}}
      cart={[]}
      favProducts={[]}
      headphone={{ id: 1, name: "Test", price: "6.7" }}
    ></Headphone>
  );

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[3].children[1].props.onClick();

  expect(agregarProductoAlCarrito).toHaveBeenCalled();
  expect(agregarProductoAlCarrito).toBeCalledTimes(1);

  testRenderer.update(
    <Router>
      <Headphone
        agregarProductoAlCarrito={agregarProductoAlCarrito}
        agregarProductoAlCarritoFav={() => {}}
        removeItemFromCartFav={() => {}}
        cart={["Test"]}
        favProducts={[]}
        headphone={{ id: 1, name: "Test", price: "6.7" }}
      ></Headphone>
    </Router>
  );

  tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

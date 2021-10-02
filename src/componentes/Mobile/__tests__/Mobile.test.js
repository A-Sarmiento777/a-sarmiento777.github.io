// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Mobile from "../Mobile";

test("Mobile Card test", () => {
  const agregarProductoAlCarrito = jest.fn(() => 1);

  let testRenderer = renderer.create(
    <Mobile
      priceFormatter={() => {}}
      agregarProductoAlCarrito={agregarProductoAlCarrito}
      agregarProductoAlCarritoFav={() => {}}
      removeItemFromCartFav={() => {}}
      cart={[]}
      favProducts={[]}
      mobile={{ id: 1, name: "Test", price: "6.7" }}
    ></Mobile>
  );

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[3].children[1].props.onClick();

  expect(agregarProductoAlCarrito).toHaveBeenCalled();
  expect(agregarProductoAlCarrito).toBeCalledTimes(1);

  testRenderer.update(
    <Router>
      <Mobile
        priceFormatter={() => {}}
        agregarProductoAlCarrito={agregarProductoAlCarrito}
        agregarProductoAlCarritoFav={() => {}}
        removeItemFromCartFav={() => {}}
        cart={["Test"]}
        favProducts={[]}
        mobile={{ id: 1, name: "Test", price: "6.7" }}
      ></Mobile>
    </Router>
  );

  tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  //   // manually trigger the callback
  //   tree.props.onMouseEnter();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();

  //   // manually trigger the callback
  //   tree.props.onMouseLeave();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
});

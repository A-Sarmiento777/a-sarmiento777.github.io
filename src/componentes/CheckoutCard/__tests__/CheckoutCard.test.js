// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import CheckoutCard from "../CheckoutCard";

test("CheckoutCard Card test", () => {
  const removeItemFromCart = jest.fn(() => 1);

  let testRenderer = renderer.create(
    <CheckoutCard
    removeItemFromCart={removeItemFromCart}
    increment={() => {}}
    decrement={() => {}}
    getCart={() => {}}
    cart={[]}
    producto={{id: 1, name: "Test", quantity: 1, type: 'asd', price: "6.7"}}
    ></CheckoutCard>
  );

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[4].props.onClick();

  expect(removeItemFromCart).toHaveBeenCalled();
  expect(removeItemFromCart).toBeCalledTimes(1);

  testRenderer.update(
    <Router>
      <CheckoutCard
        removeItemFromCart={removeItemFromCart}
        increment={() => {}}
        decrement={() => {}}
        getCart={() => {}}
        cart={['Testting']}
        producto={{id: 1, name: "Test", quantity: 1, type: 'asd', price: "6.7"}}
      ></CheckoutCard>
    </Router>
  );

  tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

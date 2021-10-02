import React from "react";
import { act, create, waitFor } from "react-test-renderer";
import Checkout from "../Checkout";

test("It should render completed Checkout", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });

  let testRenderer;
  await act(async () => {
    testRenderer = create(
        <Checkout priceFormatter={() => {}} removeItemFromCart={() => {}} increment={() => {}} decrement={() => {}} removeItemFromCartFav={() => {}} clearCart={() => {}} getCart={() => {}} cart={[]} />
        );
  });

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
//   expect(global.fetch).toHaveBeenCalledTimes(1);
});

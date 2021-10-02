import React from "react";
import { act, create, waitFor } from "react-test-renderer";
import Laptops from "../Laptops";

test("It should render completed Laptops", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });

  let testRenderer;
  await act(async () => {
    testRenderer = create(
      <Laptops priceFormatter={() => {}} agregarProductoAlCarrito={() => {}} agregarProductoAlCarritoFav={() => {}} removeItemFromCartFav={() => {}} cart={[]} favProducts={[]} />
    );
  });

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

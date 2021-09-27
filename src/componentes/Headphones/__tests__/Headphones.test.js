import React from "react";
import { act, create, waitFor } from "react-test-renderer";
import Headphones from "../Headphones";

test("It should render completed Headphones", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });

  let testRenderer;
  await act(async () => {
    testRenderer = create(
      <Headphones agregarProductoAlCarrito={() => {}} agregarProductoAlCarritoFav={() => {}} removeItemFromCartFav={() => {}} cart={[]} favProducts={[]} />
    );
  });

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

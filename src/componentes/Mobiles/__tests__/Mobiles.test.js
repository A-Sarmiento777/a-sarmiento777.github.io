import React from "react";
import { act, create, waitFor } from "react-test-renderer";
import Mobiles from "../Mobiles";

test("It should render completed Mobiles", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });

  let testRenderer;
  await act(async () => {
    testRenderer = create(
      <Mobiles priceFormatter={() => {}} agregarProductoAlCarrito={() => {}} agregarProductoAlCarritoFav={() => {}} removeItemFromCartFav={() => {}} cart={[]} favProducts={[]} />
    );
  });

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

import React from "react";
import { act, create, waitFor } from "react-test-renderer";
import Favorite from "../Favorite";

test("It should render completed Favorite", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() => {
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });

  let testRenderer;
  await act(async () => {
    testRenderer = create(
        <Favorite carritoFav={[{ id: 1, type: 'saadad', name: "Test", price: "6.7" }]} removeItemFromCartFav={() => {}} clearFav={() => {}}/>
        );
  });

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
//   expect(global.fetch).toHaveBeenCalledTimes(1);
});

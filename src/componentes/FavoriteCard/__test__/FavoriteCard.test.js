// Link.react.test.js
import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import FavoriteCard from "../FavoriteCard";

test("FavoriteCard Card test", () => {
  const removeItemFromCartFav = jest.fn(() => 1);

  let testRenderer = renderer.create(
    <FavoriteCard
      priceFormatter={() => {}}
    removeItemFromCartFav={removeItemFromCartFav} 
    producto={{ id: 1, type: 'saadad', name: "Test", price: "6.7" }}
    ></FavoriteCard>
  );

  let tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[3].props.onClick();

  expect(removeItemFromCartFav).toHaveBeenCalled();
  expect(removeItemFromCartFav).toBeCalledTimes(1);

//   testRenderer.update(
//     <Router>
//       <FavoriteCard
//     removeItemFromCartFav={removeItemFromCartFav} 
//     producto={{ id: 1, name: "Test", price: "6.7" }}
//     ></FavoriteCard>
//     </Router>
//   );

//   tree = testRenderer.toJSON();
//   expect(tree).toMatchSnapshot();

});

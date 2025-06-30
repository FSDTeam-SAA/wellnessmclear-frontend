import React from "react";
import NewArrivals from "./new-arrivals";
import MostPopular from "./most-popular";
import ShopByCategory from "./shop-by-category";
const AllProductComponents = () => {
  return (
    <div className="min-h-screen">
      <NewArrivals />
      <MostPopular />
      <ShopByCategory />
    </div>
  );
};

export default AllProductComponents;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { listProducts } from "../actions/productActions";

const SearchScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const slug = match.params.slug;
  const listProduct = useSelector(state => state.productList);
  const { products } = listProduct;
  const [] = useState("2");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts("", slug));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <h3>ALLPRODUCT</h3>
      </div>
      {products?.products &&
        products?.products.length > 0 &&
        products.products.map(product => {
          return (
            <ul>
              <li>
                <span className="left-line-dd"></span>
                <span className="left-line-dd-txt pl-2">{product.name}</span>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SearchScreen;

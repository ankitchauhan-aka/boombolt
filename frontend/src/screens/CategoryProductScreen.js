import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";
import Sidenav from "../components/sidenav";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchAllCategory } from "../actions/userActions";
import { getWishList} from "../actions/productActions";

const CategoryProductScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const slug = match.params.slug;
  const pageNumber = match.params.pageNumber || 1;
  var lastPage = pageNumber * 20;
  const [view, setView] = useState("2");
  const [order, setOrder] = useState("Price: Low - High");

  const dispatch = useDispatch();
  const carouselList = useSelector((state) => state.carouselList);
  const productList = useSelector((state) => state.productList);
  const { loading, error, page, pages, count, brands } = productList;

  var [products, setProducts] = useState([]);
  let price = [];
  let productPrice = productList?.filter_products?.products;
  if (productPrice) {
    productPrice.map((val) => {
      price.push(val.price);
    });
  }

  var maxPrice = Math.max.apply(Math, price);
  var minPrice = Math.min.apply(Math, price);

  const [priceValue, setPrice] = useState({ min: 0, max: 9999 });

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [searchedBrands, setSearchedBrands] = useState("");
  const brandList = useSelector((state) => state.brandList);
  var { brandsSelected } = brandList;
  var [productPriceRange, setProductPriceRange] = useState({});
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  var [userId, setUserId] = useState(
    userInfo && userInfo._id ? userInfo._id : ""
  );
  useEffect(() => {
    if (minPrice !== "-Infinity" && maxPrice !== "-Infinity") {
      setPrice({ min: minPrice, max: maxPrice });
      setProductPriceRange({ min: minPrice, max: maxPrice });
    }
    setProducts(productList.filter_products);
  }, [productList, minPrice, maxPrice]);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    let brandsChecked = brandsSelected || "";
    dispatch(
      listProducts(
        slug,
        pageNumber,
        brandsChecked,
        { min: "", max: "" },
        "category"
      )
    );
  }, [dispatch, keyword, pageNumber, brandsSelected, slug]);

  useEffect(() => {
    let productData = [];
    if (productList.filter_products?.products) {
      var productListData = productList.filter_products.products;
      productListData.map((product) => {
        if (brand.length > 0) {
          let brandTitle = product.brand.title;
          // product.categories.map((ca) => {
          if (brand.includes(brandTitle)) {
            if (
              product.price >= priceValue.min &&
              product.price <= priceValue.max
            ) {
              productData.push(product);
            }
          }
        } else if (
          product.price >= priceValue.min &&
          product.price <= priceValue.max
        ) {
          productData.push(product);
        }
      });

      setProducts(productData);
    }
  }, [productList, priceValue, brand]);
  useEffect(() => {
    if (userLogin?.userInfo) {
      dispatch(getWishList(userId));
    }
  }, [dispatch,userId,userLogin.userInfo]);
  useEffect(() => {
    let category_title = [];
    let brand_title = [];
    if (productList.filter_products?.products) {
      var productListData = productList.filter_products.products;
      productListData.map((product) => {
        if (product.brand) {
          brand_title.push(product.brand.title);
        }

        product.categories.map((prod) => {
          if (category_title.length > 0) {
            if (category_title.includes(prod.title) === false) {
              category_title.push(prod.title);
            }
          } else {
            category_title.push(prod.title);
          }
        });
      });
      // setBrandData(brand_title);
      // setCategoryData(category_title);
    }
  }, [productList]);

  const setProductOrder = (e) => {
    setOrder(e);
    if (e === "Sort By: High price -Low price") {
      let brandsChecked = brandsSelected || "";

      dispatch(
        listProducts(
          slug,
          pageNumber,
          brandsChecked,
          { min: "", max: "" },
          "category",
          "-1"
        )
      );
    } else if (e === "Sort By: Low price -High price") {
      let brandsChecked = brandsSelected || "";
      dispatch(
        listProducts(
          slug,
          pageNumber,
          brandsChecked,
          { min: "", max: "" },
          "category",
          "1"
        )
      );
    }
  };

  return (
    <>
      <div className="container">
        <p className="breadcrumb">
          <Link to="/">Home </Link> &gt;{" "}
          <Link to="/allProducts"> All Products </Link> {slug && ` > ${slug}`}
        </p>
        <div className="row">
          <div className="col-md-12">
            {/* <h5 className="search_result_heading"> Total Count - {count}</h5> */}
          </div>
        </div>
        <div className="row pb-4">
          <Sidenav
            id=""
            categoryData={[]}
            brandData={[]}
            categoryRange={setCategory}
            brandRange={setBrand}
            filterBrands={brands}
            slug={slug}
            keyword={keyword}
            pageNumber={pageNumber}
            searched={searchedBrands}
            setSearched={(brands) => setSearchedBrands(brands)}
            pageType="category"
          />
          <div className="col-md-10">
            <div className="row ml-md-3">
              <div className="col-md-4 col-lg-6">
                {count && products && products.length > 0 ? (
                  <h6 className="search_result_heading">
                    {" "}
                    Showing {(pageNumber - 1) * 20 + 1} -{" "}
                    {lastPage > count ? count : lastPage} Of {count} For {slug}
                  </h6>
                ) : (
                  <h6 className="search_result_heading">
                    No Products For {slug}
                  </h6>
                )}
                {/* <p className="item-no-text text-left">tems 1-20 of 61</p> */}
              </div>
              <div className="col-md-8 col-lg-6">
                <div className="row">
                  <div className="col-md-5"></div>
                  <div className="col-md-6 text-right">
                    <div className="form-group">
                      {/* <select
                      className="form-control price-selector px-2"
                      id="sel1"
                    >
                      <option >Sort By: Low price -High price</option>
                      <option>Sort By: High price -Low price</option>
                    </select> */}
                      <Dropdown
                        className="dropdown_sort sort-by"
                        value={order}
                        onSelect={(e) => setProductOrder(e)}
                      >
                        <Dropdown.Toggle
                          variant="success"
                          id="dropdown"
                          className="state-drpdwn"
                          placeholder="select Order"
                        >
                          {order}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Sort By: Low price -High price">
                            Price: Low - High
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="Sort By: High price -Low price">
                            Price: High - Low
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  {/* <div className="col-md-4 text-left">
                  <div className="form-group">
                    <select
                      onChange={(e) => setView(e.target.value)}
                      className="form-control grid-selector px-2 grid"
                      id="sel2"
                    >
                      <option value="1">View: Grid</option>
                      <option value="2">View: List</option>
                    </select>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div className="row ml-2">
              {(loading && products?.length <= 0) || !products ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>
                  {
                    // view == "1" && products && products.length > 0 ? (
                    //   products.map((product) => (
                    //     <Col key={Math.random()} sm={12} md={6} lg={4} xl={3}>
                    //       <Product product={product} history={history} />
                    //     </Col>
                    //   ))
                    // ) :
                    view === "2" && products && products.length > 0 ? (
                      products.map((product) => (
                        <ProductList
                          key={Math.random()}
                          product={product}
                          history={history}
                        />
                      ))
                    ) : (
                      <Col md={12}>
                        <Message variant="danger">No Product found</Message>
                      </Col>
                    )
                  }
                  {/* </Row> */}
                </>
              )}
            </div>
            <Row className="ml-2 mt-3">
              <Col sm={12} md={6} lg={4} xl={3}>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword || slug || "all"}
                  pageType="category"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProductScreen;

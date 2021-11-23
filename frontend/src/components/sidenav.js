import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBrands } from "../actions/brandActions";
import React, { useState, useEffect } from "react";
import { BrandProductList, listProducts } from "../actions/productActions";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { fetchTopNav } from "../actions/userActions";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import _ from "underscore";

const Sidenav = ({
  id,
  categoryData,
  brandData,
  categoryRange,
  brandRange,
  filterBrands,
  slug,
  keyword,
  pageNumber,
  searched,
  setSearched,
  pageType,
}) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState(searched ? searched.split(",") : []);
  const brandList = useSelector((state) => state.brandList);
  const [searchText, setSearchText] = useState("");
  const productList = useSelector((state) => state.productList);
  const { minPrice, maxPrice } = productList;
  const [price, setPrice] = useState({ min: minPrice, max: maxPrice });
  const [changedPrice, setChangedPrice] = useState();
  let callOut = 0
  var { brands } = brandList;
  var brandData = brands;
  brands = _.sortBy(brandData, "count").reverse();
  useEffect(() => {
    // if(pageType == 'category') {
    //   dispatch(listBrands(slug, pageNumber, 'category'));
    // } else {
    //   dispatch(listBrands(slug));
    // }
  }, [dispatch]);

  useEffect(() =>{
    if((typeof minPrice == 'number' && typeof maxPrice == 'number') && (minPrice !== price.min || maxPrice !== price.max)) {
      setPrice({ min: minPrice, max: maxPrice })
      setChangedPrice({ min: minPrice, max: maxPrice })
    }
  },[minPrice, maxPrice])

  const setBrandRange = (e) => {
    const brandTitle = e.target.value;
    var brandArray = [...brand];
    if (e.target.checked) {
      brandArray.push(brandTitle);
      setBrand([...brand, brandTitle]);
    } else {
      var index = brandArray.indexOf(brandTitle);
      if (index !== -1) {
        brandArray.splice(index, 1);
        setBrand(brandArray);
      }
    }
    dispatch(listProducts(slug || 'all', pageNumber, brandArray.join(","), price, pageType));
  };
  
  useEffect(() => {
    dispatch(fetchTopNav());
  }, [dispatch]);

  async function filterMinPrice(newPrice) {
    setChangedPrice({min: newPrice, max: changedPrice?.max})
    dispatch(listProducts(slug || 'all', pageNumber, brand.join(","), {min: newPrice, max: changedPrice?.max}, pageType))
    // setPrice({min: newPrice, max: price.max})
  }
  async function filterMaxPrice(newPrice) {
    dispatch(listProducts(slug || 'all', pageNumber, brand.join(","), {min: changedPrice?.min, max: newPrice}, pageType))
    setChangedPrice({min: changedPrice?.min, max: newPrice})
  }

  const setPriceRange = async (newRange) => {
    setChangedPrice(newRange);
    dispatch(listProducts(slug || 'all', pageNumber, brand.join(","), newRange, pageType));
  }

  return (
    <>
      <div className="col-md-2 bg-grey">
        <div className="">
          <p className="search-page-brand xxx brandSize">Brand</p>
          <input
            type="text"
            id="search_brand"
            placeholder="Search Brand"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="brandScroll">
            {brands &&
              brands.length > 0 &&
              [
                ...brands.filter((brand) =>
                  brand.title.toLowerCase().includes(searchText.toLowerCase())
                ),
              ].map((item, key) => (
                // searchText == '' || item.title.includes(searchText) &&
                <div className="row" key={item.id}>
                  {/* <div className="col-10">
                      
                    </div> */}
                  <div className="col-2">
                    {item.count != 0 && (
                      <label className="checkbox path brand-checkbox">
                        <input
                          type="checkbox"
                          id={item.id}
                          name={item.id}
                          value={item.title}
                          onChange={(e) => setBrandRange(e)}
                        />
                        <svg viewBox="0 0 21 21">
                          <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                        </svg>
                      </label>
                    )}
                  </div>
                  <div className="col-10 pl-0">
                    {item.count != 0 && (
                      <label className="checkbox" htmlFor={item.id}>
                        &nbsp;{item.title}({item.count})
                      </label>
                    )}
                  </div>
                </div>
              ))}
          </div>
              <p className="search-page-brand my-3 priceSize">Price</p>

              {/* <div className="slider pt-1">
                <InputRange
                  minValue={minPrice}
                  maxValue={maxPrice}
                  step={Math.min(100,parseInt(maxPrice/10))}
                  value={changedPrice}
                  // disabled
                  // onChange={(value) => setPriceRange(value)}
                  
                /> 
              </div> */}
              <div className="slider pt-1">
                {/* <Row>
                  <Col md={6}>
                    <input type="number" style={{width: '100px', height: '30px', fontSize: '18px'}} placeholder="min" value={changedPrice?.min} onChange={e => filterMinPrice(e.target.value)}/>
                  </Col>
                  <Col md={6}>
                    <input type="number" style={{width: '100px', height: '30px', fontSize: '18px'}} value={changedPrice?.max} placeholder="max" onChange={e => filterMaxPrice(e.target.value)}/>
                  </Col>
                </Row> */}

                <Row className="priceDropdown">
                  <Col md={6}>
                    <Dropdown onSelect={e => filterMinPrice(parseInt(e))}>
                    {/* onChange={e => filterMinPrice(e.target.value)} */}
                      {/* onSelect={(e) => minimumPriceRange(e)}> */}
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown"
                        className="state-drpdwn"
                      >
                        ${changedPrice?.min || minPrice}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey={minPrice}>
                          {minPrice}
                        </Dropdown.Item>
                        {[1,2,3,4,5,6,7,8,9].map((index) => {
                          const val = parseInt(maxPrice/10)*index
                          
                          return (!changedPrice || changedPrice?.max > val) && <Dropdown.Item eventKey={val}>
                                    {val}
                                  </Dropdown.Item>
                          }
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={6}>
                    <Dropdown onSelect={e => filterMaxPrice(parseInt(e))}>
                      {/* onSelect={(e) => minimumPriceRange(e)}> */}
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown"
                        className="state-drpdwn"
                      >
                        ${changedPrice?.max || maxPrice}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[1,2,3,4,5,6,7,8,9,10].map((index) => {
                          const val = parseInt(maxPrice/10)*index
                          return (!changedPrice || changedPrice?.min < val) && <Dropdown.Item eventKey={val}>
                                    {val}
                                  </Dropdown.Item>
                          }
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </div>
            {/* </> */}
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default Sidenav;

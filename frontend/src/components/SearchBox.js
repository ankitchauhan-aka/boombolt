import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href = `/search/${keyword}`;
    }
  };

  return (
    <>
      {/* <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form> */}
      {/* <form onSubmit={submitHandler} className="search-input-group">
        <div className="input-group">
          {/* <span className="caret-box">&#9660;</span> 
          <input
            type="text"
            name="q"
            onChange={e => setKeyword(e.target.value)}
            className="form-control form-control-md search-input mobile-search-border"
            placeholder="Search for Bags"
          />
          <div className="input-group-append">
            <button className="btn btn-search" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form> */}
      <li className="menu-li-left">
        <a href="#" className="mr-1 searchButton">
          <img src={"/images/search.png"} />
        </a>
        <ul className="right-dd-open searchFormUl">
          <li className="cus-textbox">
            
            <form onSubmit={submitHandler} className="form-inline searchForm">
              <div className="form-group mx-2 my-2">
                <input
                  type="text"
                  className="form-control form-control-sm pl-2 searchText"
                  id="searchText"
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="search..."
                />
                <button type="submit" className="form-search-btn">
                  <img src={"/images/search.png"} title="search" />
                </button>
              </div>
            </form>
          </li>
        </ul>
      </li>
    </>
  );
};

export default SearchBox;

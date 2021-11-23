import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { CSSTransition } from 'react-transition-group';
import { Navbar, Nav, Form, FormControl, Dropdown, DropdownButton, NavDropdown } from "react-bootstrap";
import { Menu, MenuItem, MenuButton, SubMenu, MenuHeader, MenuDivider } from '@szhsin/react-menu';
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
const Header = ({ history, match }) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>

      <Navbar bg="light" variant="light" className="boombolt-nav">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={'/images/fox.png'}
            width="70"
            height="70"
            className="d-inline-block align-top"
          />
          <img src={'/images/bb-wt.png'} className="d-inline-block align-middle img-logo-text" />{' '}
        </Navbar.Brand>

        <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert">
          <Nav className="m-auto pr-2 hover-border-img">
            {/* <Nav.Link href="#home" className="active">home</Nav.Link> */}
            <NavDropdown title="Home" id="basic-nav-dropdown" className="active" renderMenuOnMount={true} onMouseEnter={()=>setShowMessage(true)}  >
              <NavDropdown.Item >File</NavDropdown.Item>
              <NavDropdown.Item>Save </NavDropdown.Item>
              <NavDropdown.Item >Close</NavDropdown.Item>
              <NavDropdown.Item>Edit</NavDropdown.Item>
              <NavDropdown.Item >Cut</NavDropdown.Item>
              <NavDropdown.Item>Paste</NavDropdown.Item>
              <NavDropdown.Item >Print</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="new arivals" id="basic-nav-dropdown" className="" renderMenuOnMount={true} >
              <NavDropdown.Item >File</NavDropdown.Item>
              <NavDropdown.Item>Save </NavDropdown.Item>
              <NavDropdown.Item >Close</NavDropdown.Item>
              <NavDropdown.Item>Edit</NavDropdown.Item>
              <NavDropdown.Item >Cut</NavDropdown.Item>
              <NavDropdown.Item>Paste</NavDropdown.Item>
              <NavDropdown.Item >Print</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="man" id="basic-nav-dropdown" className="" renderMenuOnMount={true} >
              <NavDropdown.Item>Open</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
              <NavDropdown.Item>Save</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="woman" id="basic-nav-dropdown" className="" renderMenuOnMount={true}>
              <NavDropdown.Item>Open</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
              <NavDropdown.Item>Save</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="junior" id="basic-nav-dropdown" className="" renderMenuOnMount={true} >
              <NavDropdown.Item>Open</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
              <NavDropdown.Item>Save</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="wolfpack" id="basic-nav-dropdown" className="" renderMenuOnMount={true} >
              <NavDropdown.Item>Open</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
              <NavDropdown.Item>Save</NavDropdown.Item>
              <NavDropdown.Item >Save</NavDropdown.Item>
            </NavDropdown>
    

            <Nav.Link href="#sale"><img src={'/images/sale1.png'} /></Nav.Link>

          </Nav>
          </CSSTransition>
        <Form inline>
          <DropdownButton
            menuAlign="right"
            variant=" px-2 py-3"
            title={
              <span><i className="fa fa-search text-white "></i></span>
            }
            id="dropdown-search"
          >
            <Dropdown.Item eventKey="1">
              <FormControl type="text" placeholder="Search" className="w-100" />
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            menuAlign="right"
            variant=" btn px-2 py-3"
            title={
              <span><i className="fas fa-user-circle fa-fw text-white "></i></span>
            }
            id="dropdown-user"
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
          <Nav>
            <Nav.Link href="#sale"><i className="fas fa-shopping-cart text-white" ></i></Nav.Link>
          </Nav>
        </Form>
      </Navbar>
    </>
  );
};

export default withRouter(Header);

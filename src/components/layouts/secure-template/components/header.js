import React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap';
import _get from 'lodash.get';
import Router from 'next/router';
import { removeLocalStorageCred } from '@/utils/local-storage';
import SvgIcons from '@/src/icons';

const Header = (props) => {
  const { userData } = props;
  const handleLogout = () => {
    removeLocalStorageCred();
    Router.push('/', '/');
  };
  return (
    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <Link
          href="/admin/projects"
          className="h4 mb-0 text-white
             text-uppercase d-none d-lg-inline-block"
        >
          Webicient
        </Link>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <SvgIcons type="svg-avatar" />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm text-black font-weight-bold">
                    {_get(userData, 'first_name', '')}{' '}
                    {_get(userData, 'last_name', '')}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" end>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#" onClick={handleLogout}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export { Header };

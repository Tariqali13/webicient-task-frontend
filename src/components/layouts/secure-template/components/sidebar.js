import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, NavItem, NavLink, Nav, Container, NavbarBrand } from 'reactstrap';

const SideBar = (props) => {
  const { routes = [], logo = {}, isRouting = false } = props;
  const router = useRouter();

  const activeRoute = (routeName) => {
    return router.route.indexOf(routeName) > -1;
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem
          key={key}
          active={activeRoute(prop.layout + prop.path)}
          className={isRouting ? 'disabled-link' : ''}
        >
          <Link href={prop.layout + prop.path}>
            <NavLink active={activeRoute(prop.layout + prop.path)}>
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </Link>
        </NavItem>
      );
    });
  };
  let navbarBrand = (
    <NavbarBrand href="#" className="pt-0">
      <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
    </NavbarBrand>
  );
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
      {logo && logo.innerLink ? (
          <Link href={logo.innerLink}>
            <span>{navbarBrand}</span>
          </Link>
        ) : null}
        {/* Navigation */}
        <Nav navbar>{createLinks(routes)}</Nav>
        {/* Divider */}
        <hr className="my-3" />
        {/* Heading */}
      </Container>
    </Navbar>
  );
};

export { SideBar };

import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <div className="hero-head">
        <nav
          className="navbar has-background-black is-primary"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href>
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt=""
                  width="112"
                  height="28"
                />
              </a>

              <a
                href
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

            <div
              id="navbarBasicExample"
              className="navbar-menu has-background-black"
            >
              <div className="navbar-end has-text-centered ">
                <Link to={"/"} className="navbar-item ">
                  Home
                </Link>
                <Link to={"/about"} className="navbar-item">
                  About
                </Link>
                <Link to={"/portfolio"} className="navbar-item">
                  Portfolio
                </Link>
                <Link to={"/contact"} className="navbar-item">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;

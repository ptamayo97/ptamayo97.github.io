import React from "react";

const tabs = [
  {
    name: "About",
    href: "#aboutMe"
  },
  {
    name: "Portfolio",
    href: "#portfolio"
  },
  {
    name: "Contact",
    href: "#contact"
  }
];

const Nav = () => {
  return (
    <div>
      <nav className="red darken-4 " id="navbar">
        <div className="nav-wrapper">
          <a className="brand-logo " id="brand" href="#aboutMe">
            P.T.
          </a>
          <a
            href="#"
            data-target="mobil-demo"
            className="sidenav-trigger right"
          >
            <i className="material-icons ">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {tabs.map(tab => (
              <li>
                <a href={tab.href}>{tab.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <ul className="sidenav red darken-4 " id="mobil-demo">
        {tabs.map(tab => (
          <li>
            <a href={tab.href} className="white-text">{tab.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class App extends Component {
  // state = {
  //   nav: {
  //     home: { active: false },
  //     about: { active: false },
  //     portfolio: { active: false },
  //     contact: { active: false }
  //   }
  // };
  handleTabs = () => {
    if (Home) {
      this.setState({ nav: { home: { active: true } } });
    }
  };
  render() {
    return (
      <Router>
        <div className="hero is-fullheight ">
          <Nav handleTabs={this.handleTabs} />
          <div className="hero-body has-background-dark">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

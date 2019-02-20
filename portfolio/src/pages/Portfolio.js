import React from "react";
import Card from "../components/Card";
import cards from "./cards.json";
class Portfolio extends React.Component {
  state = {
    cards
  };

  render() {
    return (
    //   <div className="hero-body has-background-dark">
        <div className="container is-fluid">
          <section className="section has-text-centered ">
            <h1 className="title has-text-white">Portfolio</h1>
            <h2 className="subtitle">
              A simple container to divide your page into{" "}
              <strong>sections</strong>, like the one you're currently reading
            </h2>
          </section>
          <section className="section ">
            <div className=" columns is-multiline">
              {/* <content></content> */}
              {this.state.cards.map(card => (
                <div className="column is-3">
                  <Card key={card.id} name={card.name} img={card.img} />
                </div>
              ))}
            </div>
          </section>
        </div>
    //   </div>
    );
  }
}

export default Portfolio;

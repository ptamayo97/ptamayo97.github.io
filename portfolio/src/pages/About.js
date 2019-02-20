import React from "react";

class About extends React.Component {
  state = {};
  render() {
    return (
      <div className="container ">
        <section className="section has-text-centered has-background-black">
          <h1 className="title has-text-primary">About</h1>
        </section>

        <section className="section has-text-centered has-background-primary">
          <div className="box has-background-light">
            <content calssName="is-large">
              <h1 class="title">I'm Paul</h1>
            </content>
          </div>
        </section>
      </div>
    );
  }
}

export default About;

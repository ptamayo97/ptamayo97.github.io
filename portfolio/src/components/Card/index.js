import React from "react";

const Card = props => {
  return (
    <div className="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src={props.img}
            alt={props.name}
          />
        </figure>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            <a href>GitHub</a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            <a href>Demo</a>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Card;

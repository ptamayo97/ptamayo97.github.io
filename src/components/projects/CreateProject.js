import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import Uploader from "../Uploader";
import axios from "axios";
class CreateProject extends Component {
  state = {
    title: "",
    content: "",
    tech: "",
    github: "",
    site: "",
    img: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push("/");

    // this.fileUploadHandler();
  };
  fileSelectedHandler = e => {
    this.setState({ img: e.target.files[0] });
    console.log(this.state.img);
  };

  // fileUploadHandler = () => {
  //   const fd = new FormData();
  //   fd.append("image", this.state.img, this.state.img.name);
  //   axios
  //     .post(
  //       "https://us-central1-portfolio-9eef0.cloudfunctions.net/uploadFile",
  //       fd
  //     )
  //     .then(res => {
  //       console.log(res);
  //     });
  // };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white row" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Project</h5>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} />
            <label htmlFor="title">Project Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="content">Project Content</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="content">Technologies Used</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="content">Git Hub</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
            <label htmlFor="content">Live Site</label>
          </div>
          {/* <Uploader /> */}
          <div>
            <input type="file" onChange={this.fileSelectedHandler} />
            {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);

// import React, { Component } from "react";
import React, { Component } from "react";
// import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import axios from "axios";
class Uploader extends Component {
  state = { selectedFile: null };
  // static propTypes = {
  //   firebase: PropTypes.object
  // };

  fileSelectedHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios
      .post(
        "https://us-central1-portfolio-9eef0.cloudfunctions.net/uploadFile",
        fd
      )
      .then(res => {
        console.log(res);
      });
  };

  // addTestFile = () => {
  //   const {
  //     firebase: { storage }
  //   } = this.props;
  //   const storageRef = storage().ref();
  //   const fileRef = storageRef.child("test.txt");
  //   return fileRef
  //     .putString("Some File Contents")
  //     .then(snap => console.log("upload successful", snap))
  //     .catch(err => console.error("error uploading file", err));
  // };
  render() {
    return (
      // <div className="row">
      //   <div className=" col  file-field input-field">
      //     <div className="btn">
      //       <span>File</span>
      //       <input type="file" multiple />
      //     </div>
      //   </div>
      //   <div className="col s11 file-path-wrapper">
      //     <input
      //       className="file-path validate"
      //       type="text"
      //       placeholder="Upload one or more files"
      //     />
      //   </div>
      // </div>
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />
        {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
      </div>
    );
  }
}

// export default Uploader

// class Uploader extends Component {

//   render() {
//     return (
//       <div>
//         <h1>Example Upload</h1>
//         <button onClick={this.addTestFile}>
//           Upload Example File
//         </button>
//       </div>
//     )
//   }
// }

export default firebaseConnect()(Uploader);

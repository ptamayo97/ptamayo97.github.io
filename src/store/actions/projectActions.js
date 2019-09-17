import { auth, database, storage } from "../../config/fbConfig";
export const createProject = (project, picture) => {
  const { img } = project;
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        // storage
        //   .child(`project/${picture.name}/${new Date().getTime()}`)
        //   .put(img[0])
        //   .then(snapshot => {
        //     database
        //       .ref("projects")
        //       .child(project.uid)
        //       .set({
        //         // fname,
        //         // lname,
        //         picture: snapshot.metadata.downloadURLs[0]
        //       });
        //   });
        dispatch({ type: "CREATE_PROJECT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
      });
  };
};

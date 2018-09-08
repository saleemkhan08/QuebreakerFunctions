import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const USER_COLLECTION = "users";
export const firestoreInstance = admin.firestore();
exports.addUserToFirestore = functions.auth.user().onCreate(user => {
  const currentUser = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    type: "user"
  };
  return firestoreInstance
    .collection(USER_COLLECTION)
    .doc(currentUser.uid)
    .set(currentUser);
});

exports.deleteUserFromFirestore = functions.auth.user().onDelete(user => {
  return firestoreInstance
    .collection(USER_COLLECTION)
    .doc(user.uid)
    .delete();
});

//exports.importCsvMenu = functions.storage.object().onFinalize()

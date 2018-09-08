"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const USER_COLLECTION = "users";
exports.firestoreInstance = admin.firestore();
exports.addUserToFirestore = functions.auth.user().onCreate(user => {
    const currentUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        type: "user"
    };
    return exports.firestoreInstance
        .collection(USER_COLLECTION)
        .doc(currentUser.uid)
        .set(currentUser);
});
exports.deleteUserFromFirestore = functions.auth.user().onDelete(user => {
    return exports.firestoreInstance
        .collection(USER_COLLECTION)
        .doc(user.uid)
        .delete();
});
//# sourceMappingURL=index.js.map
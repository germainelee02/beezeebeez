import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { db, authentication } from "../firebase/firebase-config";
import { Auth, getAuth } from "firebase/auth";

class User {
  constructor(email, fName, lName, phoneNum) {
    this.email = email;
    this.fName = fName;
    this.lName = lName;
    this.phoneNum = phoneNum;
  }
  toString() {
    return this.fName + ", " + this.lName + ", " + this.email;
  }
}

// Firestore data converter
const userConverter = {
  toFirestore: (user) => {
    return {
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      phoneNum: user.phoneNum,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.email, data.fName, data.lName, data.phoneNum);
  },
};

const getUser = async () => {
  try {
    const usersDocRef = doc(
      db,
      "users",
      getAuth().currentUser.uid
    ).withConverter(userConverter);
    const userRefSnap = await getDoc(usersDocRef);
    if (userRefSnap.exists()) {
      return (user = userRefSnap.data());
    }
  } catch (e) {
    console.log(e);
  }
};

export { userConverter };

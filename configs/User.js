class User {
  constructor(email, fName, lName) {
    this.email = email;
    this.fName = fName;
    this.lName = lName;
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
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.email, data.fName, data.lName);
  },
};

export { userConverter };

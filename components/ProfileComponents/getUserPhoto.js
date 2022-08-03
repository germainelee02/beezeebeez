import * as React from 'react';
import { Component } from 'react';
import { Auth, getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


const getUserPhotoUrl = () => {
    const storage = getStorage();
    const fileName = getAuth().currentUser?.uid;
    const pathRef = ref(storage, `images/${fileName}.jpg`);
    getDownloadURL(pathRef).then((url) => {return url})
}

export {getUserPhotoUrl}
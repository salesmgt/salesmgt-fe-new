import firebase from 'firebase/app'
import 'firebase/storage'

// Firebase configuration (taken from Firebase Project)
const firebaseConfig = {
    apiKey: "AIzaSyCHSm_Ao_JD7lLjcx8_Y5IAa6dhrmDfWp0",
    authDomain: "major-sales-management.firebaseapp.com",
    projectId: "major-sales-management",
    storageBucket: "major-sales-management.appspot.com",
    messagingSenderId: "800377937110",
    appId: "1:800377937110:web:ae18c4322926c9ffe7fd77"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
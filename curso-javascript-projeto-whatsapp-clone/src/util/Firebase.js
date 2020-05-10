import { firestore } from 'firebase';

const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {
    constructor() {
        // Your web app's Firebase configuration
        this._config = {
            apiKey: "AIzaSyCmrPGXNY7sLIKC3Beywrk8CbQxPvjs4RA",
            authDomain: "whatsapp-clone-ac627.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-ac627.firebaseio.com",
            projectId: "whatsapp-clone-ac627",
            storageBucket: "whatsapp-clone-ac627.appspot.com",
            messagingSenderId: "803933240560",
            appId: "1:803933240560:web:8e974eb0de6c76aa54d635",
            measurementId: "G-01V0DTKBTX"
        };
        this.init();
    }
    init() {
        if (!window._initializedFirebase) {
            // Initialize Firebase
            firebase.initializeApp(this._config);
            firebase.analytics();
            window._initializedFirebase = true;
        }
    }
    static db(){
        return firebase.firestore();
    }
    static hd(){
        return firebase.storage();
    }
    initAuth(){
        return new Promise((s,f)=>{
            //Define o mecanismo de autenticação como sendo a conta google do usuário
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result=>{
                let token = result.credential.accessToken;
                let user = result.user;
                s({
                    user,
                    token
                });
            }).catch(err=>{
                f(err);
            });
        });
    }
}
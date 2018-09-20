import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;
import { Usuario } from '../Model/models';

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    signInWithEmail(credentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
            credentials.password);
    }

    get authenticated(): boolean {
        return this.user !== null;
      }

      getEmail() {
        return this.user && this.user.email;
      }

      getTelefono() {
        return this.user && this.user.phoneNumber;
      }

      getUserID() {
        return this.user && this.user.uid;
      }

      getUserNombre() {
        return this.user && this.user.displayName;
      }

      signOut(): Promise<void> {
        this.user = null;
        return this.afAuth.auth.signOut();
      }

    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

    signInWithGoogle(): Promise<any> {
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    signInWithFacebook(): Promise<any> {
        return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
    }


    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(() => {
                    return this.afAuth.auth.getRedirectResult().then(result => {
                        // This gives you a Google Access Token.
                        // You can use it to access the Google API.
                        const token = result.credential.providerId;
                        // The signed-in user info.
                        const user = result.user;
                        this.user = result.user;
                        console.log(token, user);
                    }).catch(function (error) {
                        // Handle Errors here.
                        alert(error.message);
                    });
                });
        }
    }
}

import firebase    from 'firebase';
import firebaseApp from "./firebase";

class Auth_service {
    login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }

    loginSendMail(email,actionCodeSettings){
        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });

    }

    CodeCheckMail(){
        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                return false;
                // email = window.prompt('Please provide your email for confirmation');
            }
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                })
                .catch((error) => {
                });
        }
    }

    logout(){
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged){
        firebase.auth().onAuthStateChanged(user=>{
            onUserChanged(user);
        })
    }
}

export default Auth_service

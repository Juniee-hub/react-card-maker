import { firebaseAuth, githubProvider, googleProvider } from "./firebase";

class Auth_service {
    getProvider(providerName){
        switch (providerName){
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default:
                throw new Error(`not supported provider ${providerName}`)
        }
    }

    login(providerName){
        // const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }

    loginSendMail(email,actionCodeSettings){
        firebaseAuth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                console.log('Mail Send Error');
                console.log(error);
                // ...
            });

    }

    CodeCheckMail(){
        // Confirm the link is a sign-in with email link.
        if (firebaseAuth.isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                return false;
                // email = window.prompt('Please provide your email for confirmation');
            }
            firebaseAuth.signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                })
                .catch((error) => {
                });
        }
    }

    logout(){
        firebaseAuth.signOut();
    }

    onAuthChange(onUserChanged){
        firebaseAuth.onAuthStateChanged(user=>{
            onUserChanged(user);
        })
    }
}

export default Auth_service

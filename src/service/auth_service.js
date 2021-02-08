import firebase from 'firebase';

class Auth_service {
    login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
    }
}

export default Auth_service

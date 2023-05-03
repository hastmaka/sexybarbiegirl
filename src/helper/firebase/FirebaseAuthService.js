import {auth} from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getIdToken
} from 'firebase/auth';
import {getById, getUser} from "./FirestoreApi";
import {userSliceActions} from "../../store/userSlice";

export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return window.displayNotification({
                        t: 'error',
                        c: 'Email already in use, please choose another one'
                    });
                default:
                    return window.displayNotification({
                        t: 'error',
                        c: 'Internal Error'
                    });
            }
        })
};

export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/wrong-password':
                    return window.displayNotification({
                        t: 'error',
                        c: 'Wrong Password, Double check Caps'
                    });
                case 'auth/user-not-found':
                    return window.displayNotification({
                        t: 'error',
                        c: 'User not Found',
                        i: true
                    });
                case 'auth/too-many-requests':
                    return window.displayNotification({
                        t: 'error',
                        c: 'Too many request was made, try again later',
                        i: true
                    });
                default:
                    return window.displayNotification({
                        t: 'error',
                        c: 'Firebase Unknown Error'
                    });
            }
        })
}

export const logoutUser = () => {
    return signOut(auth);
}

export const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
}

export const subscribeToAuthChanges = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            let token = await getIdToken(firebaseUser);
            try {
                const user = await getUser(firebaseUser.uid);
                window.dispatch(userSliceActions.setUser({...user, token}))
            } catch (err) {
                console.log(err);
            }
        }
    })
}

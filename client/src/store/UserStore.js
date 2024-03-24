// mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
import { makeAutoObservable } from "mobx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { getOrsaveUserInDatabase, getUserFromDatabase, } from "../http/userApi";
import { loginUserWithEmailAndPassFireBase, registerUserWithEmailAndPassFireBase } from "../utils/fireBase/authFireBaseService";

export default class UserStore {
    constructor(){
        this._isAuth = false // _ означає що ця змінна не може мінятися
        this._user = {}
        this._isLoading = false

        makeAutoObservable(this)
    }

    // Ections - це функції, які якось змінюють состояниє
    setIsAuth(bool){    
        this._isAuth = bool  
    }
    setUser(user){
        this._user = user 
    }
    setLoading(bool){
        console.log("setloading", bool)
        this._isLoading = bool  
    }
    // get (викликається тількі тоді коли змінна яка була всередині зміниться)
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get isLoading(){
        return this._isLoading
    }

    async login(email, password){
        try {
            const userFireBase = await loginUserWithEmailAndPassFireBase(email, password);

            const response = await getUserFromDatabase(userFireBase.uid);

            this.setUser(response.user);
            this.setIsAuth(true);
        } catch (error) {
            throw error;
        }
    }
    async registration(email, password){
        try {
            const userFireBase = await registerUserWithEmailAndPassFireBase(email, password);

            const response = await this.getUserFromDB(userFireBase.email, userFireBase.uid);
        } catch (error){
            throw error;
        }
    } 

    async getUserFromDB(email, uid){
        try {
            const response = await getOrsaveUserInDatabase(email, uid);

            this.setUser(response.user);
            this.setIsAuth(true);
        } catch (error){
            throw error
        }
    } 

    async logout(){
        try {
            const auth = getAuth();
            signOut(auth).then(() => { 
                // Sign-out successful.
                }).catch((error) => {
                console.log(error.message)
            });

            this.setIsAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    async checkAuth(){
        const auth = getAuth();
    
        try {
            const userFireBase = await new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    unsubscribe();
                    resolve(user);
                }, reject);
            });
    
            if (userFireBase) {
                const response = await getUserFromDatabase(userFireBase.uid);
    
                if(response != null){
                    this.setUser(response.user);
                    this.setIsAuth(true);
                }
            } else {
                this.setUser(null);
            }
        } catch (error) {
            console.error("Error checking authentication:", error); 
        }
    }
    //UPDATE import { getAuth, updateProfile } from "firebase/auth";
    // const auth = getAuth();
    // updateProfile(auth.currentUser, {
    
    //https://firebase.google.com/docs/auth/web/manage-users?hl=ru&authuser=0
    
    // updateProfile(auth.currentUser, {
    //     displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    //   }).then(() => {
    //     // Profile updated!
    //   }).catch((error) => {
    //     // An error occurred
    //   });
}
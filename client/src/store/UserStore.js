// mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor(){
        this._isAuth = false // _ означає що ця змінна не може мінятися
        this._user = {}
        makeAutoObservable(this)
    }

    // Ections - це функції, які якось змінюють состояниє
    setIsAuth(bool){    
        this._isAuth = bool  
    }
    setUser(user){
        this._user = user 
    }
    // get (викликається тількі тоді коли змінна яка була всередині зміниться)
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
}
import { makeAutoObservable } from "mobx";

export default class CatalogStore {
    constructor(){
        this._catalogСategories = [
            { icon: "People" , category: 'Ноутбуки та комп’ютери' },
            { icon: "Public" , category: 'Смартфони, ТВ і електроніка' },
            { icon: "People" , category: 'Товари для геймерів' },
            { icon: "PermMedia" , category: 'Побутова техніка' },
            { icon: "People" , category: 'Сантехніка та ремонт' },
            { icon: "Dns" , category: 'Спорт і захоплення' },
            { icon: "Dns" , category: 'Спорт і захоплення' },
        ]

        makeAutoObservable(this)
    }

    setCatalogСategories(catalogСategories){
        this._catalogСategories = catalogСategories; 
    }

    get catalogСategories(){
        return this._catalogСategories;
    }
}
class Storage {
    static categories = [];
    static tasks = [];
    static notifications = [];
    static events = [];

    static setItem(item, fieldName) {
        this[fieldName].push(item)


    }

    static getItem(key, value, fieldName) {

        var result = this[fieldName].find(item => item[key] == value) // [] are to search the static properties and not the string
        return result;

    }
    static getItems(key, value, fieldname) {
        var result = this[fieldname].filter(item => item[key] == value)
        return result;
    }
    static getAll(key, fieldName) {
        var result = this[fieldName].map(item => item[key]);
        return result;
    }
    static getField(fieldName) {
        var result = this[fieldName];
        return result;
    }
    static updateItem(key, value, keyToUpdate, updateValue, fieldName) {
        for (var i = 0; i < this[fieldName].length; i++) {
            if (this[fieldName][i][key] == value) {
                this[fieldName][i][keyToUpdate] = updateValue;
            }
        }
    }
    static updateItems(key, value, fieldname) {
        this[fieldname].forEach(item => item[key] = value)
    }
    static replaceItem(key, value, newObj, fieldname) {
        var index = this[fieldname].findIndex(item => item[key] == value)
        if (index > -1) {
            this[fieldname][index] = newObj
        }
    }
    static deleteItem(key, value, fieldName) {
        var index = this[fieldName].findIndex(item => item[key] == value);
        if (index > -1) {
            this[fieldName].splice(index, 1);
        }
    }
    static clearField(fieldname){
        this[fieldname].length=0
    }
}
export default Storage;
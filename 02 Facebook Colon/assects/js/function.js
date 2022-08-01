// validtion msg function
const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`
}

// get LS data 
const readLSData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }
}


// Create custom LS data
const createLSData = (key, value) => {
    let data = [];
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}


// update your LS data
const uploadLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}
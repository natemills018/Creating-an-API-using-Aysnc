const fs = require('fs');
const { resolve } = require('path');
let chirps = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json'));
}

const requestShouldBreak = () => {
    return 1 / 4 > Math.random();
};

let getChirps = () => {
    return new Promise((resolve,reject) => {
        if(requestShouldBreak()) {
            reject("Database error - couldn't recieve chirps at this time")
        } else {
            resolve(Object.assign({}, chirps))
        }
    })
}

let getChirp = id => {
    return new Promise((resolve, reject)=> {
        if(requestShouldBreak()) {
            reject("Couldn't recieve your chirp at this time, try again later")
        } else {
            resolve(Object.assign({}, chirps[id]))
        }
    })
}

let createChirp = (chirp) => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Couldn't create your chirp at this time, try again later")
        } else {
            chirps[chirps.nextid++] = chirp;
            writeChirps();
            resolve('Keep on chirping')
        }
    })
    
};

let updateChirp = (id, chirp) => {
    return new Promis((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Couldn't update the chirp at this time, try again later")
        } else {
            chirps[id] = chirp;
            writeChirps();
            resolve('Updated Successfully')
        }
    })
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        if(requestShouldBreak()) {
            reject("Couldn't delete the chirp at this time, try again later")
        } else {
            delete chirps[id];
            writeChirps();
            resolve("You've Deleted the chirp successfully")
        }
    })
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}
const DATABASE = {};

DATABASE.LOCAL = {
    DBNAME: "search-car-db",
    USERNAME: "root", 
    PASSWORD: ""
}

DATABASE.PROD = {
    DBNAME: "",
    USERNAME: "",
    PASSWORD: ""
}

module.exports = DATABASE;
const DATABASE = {};

DATABASE.LOCAL = {
    DBNAME: "search-car-db",
    USERNAME: "root", 
    PASSWORD: ""
}

DATABASE.PROD = {
    DBNAME: process.env.DB,
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASSWORD
}

module.exports = DATABASE;
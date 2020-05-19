module.exports = {
    host: process.env.MYSQL_HOST || "",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "uequations",
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 4,
    acquireTimeout: process.env.MYSQL_ACQUIRE_TIMEOUT || 10000
};

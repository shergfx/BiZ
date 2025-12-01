import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",   // agar parol bo'lsa shu yerga yoz
    database: "biz_platform"
});

db.connect(err => {
    if (err) console.log("MYSQL ulanmadi ❌", err);
    else console.log("MYSQL ulandi ✔");
});

export default db;

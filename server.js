    import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Roʻyxatdan o'tish
app.post('/register', (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;

    const sql = `
        INSERT INTO users (firstname, lastname, email, phone, password) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [firstname, lastname, email, phone, password], (err) => {
        if (err) return res.status(500).json({ msg: "Xatolik yuz berdi", err });
        res.json({ msg: "Roʻyxatdan o'tish muvaffaqiyatli ✔" });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, data) => {
        if (err) return res.status(500).json({ msg: "Xatolik", err });

        if (data.length > 0) {
            return res.json({ msg: "Kirish muvaffaqiyatli ✔", user: data[0] });
        } else {
            return res.status(401).json({ msg: "Email yoki parol notoʻgʻri ❌" });
        }
    });
});

// Server
app.listen(3000, () => console.log("Server 3000-portda ishlamoqda ✔"));

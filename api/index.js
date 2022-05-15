const express = require('express');

const app = express();
require('dotenv').config();


const port = 5000;
const jwt = require('jsonwebtoken');

app.use(express.json());

const users = [
    {
        id: "1",
        userName: "John",
        password: "passjohn01@",
        isAdmin: true

    },
    {
        id: "2",
        userName: "Jane",
        password: "passjane01@",
        isAdmin: false

    },
    {
        id: "3",
        userName: "Jacob",
        password: "passjacob01@",
        isAdmin: false

    },
    {
        id: "4",
        userName: "Jeph",
        password: "passjeph01@",
        isAdmin: false

    },
]



app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    // let login = false;
    // let user = "";

    // for (user of users) {
    //     if (user.userName === username & user.password === password) {
    //         login = true;
    //         user = username;
    //         break;
    //     }
    // }
    const user = users.find(user => {
        return user.userName === username & user.password === password;
    })

    if (user) {
        // res.json(`Welcome ${user.userName}`)
        // Generate Access token
        console.log(process.env.SECRET_KEY)
        const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY);
        res.json({
            username: user.userName,
            isAdmin: user.isAdmin,
            accessToken
        })
    }
    // if (login) {
    //     res.json(`Welcome ${user}`);
    // }

    res.status(400).json("Please check username or password");

});

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY)
    } else {
        res.status(401).json('User not authorized')
    }
}


app.listen(port, () => console.log("Backend server is running on port ", port));

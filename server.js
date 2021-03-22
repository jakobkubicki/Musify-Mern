const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const router = express.Router();
const Users = require("./client/models/User.js");

const app = express();

app.use(express.json());

//DB config
const db = config.get('mongoURI');

mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true}).then(() => console.log('Mongo is connected')).catch(err => console.log(err));

app.use("/", router);
router.route("/getData").get(function(req, res) {
    Users.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

app.use(express.static(path.join(__dirname, "client", "build")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

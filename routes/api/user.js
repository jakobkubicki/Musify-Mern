const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../client/models/User');

//Register new user

router.post('/', (req, res) => {
    const { fname, lname, email, password} = req.body;

    if(!fname || !lname|| !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
        .then(user => {
            if(user) {
                return res.status(400).json({msg: 'User already exists'});
            }

            const newUser = new User({
                fname,
                lname,
                email,
                password
            });

            //Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save() //Save to database
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            fname: user.fname,
                                            lname: user.lname,
                                            email: user.emal
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
});

router.put('/update/:id', function (req, res){
    console.log("Profile Updated");
    let updateObj = req.body.user;
    console.log(updateObj);
    User.findByIdAndUpdate(req.params.id,
    {
        $set: updateObj
    },
    {
        new: true
    },
        function(err, updatedProfile){
            if(err){
                res.setEncoding("Error updating profile");
            }
            else{
                res.json(updatedProfile);
            }
        }
    );
});

module.exports = router;
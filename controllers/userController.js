const userSchema = require('../models/usersSchema');
var userController = {}; 

userController.userList = (req, res) => {
    userSchema.find({}).sort({_id: -1}).exec((err, Users) => {
        if(err){
            return res.status(400).json({
                status:false,
                message: 'No dunciono :p ',
                err
            })
        }
        return res.send(Users);
    })
    
}


module.exports = userController;
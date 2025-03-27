const express = require("express");

const {users} = require("../data/users.json");

const router = express.Router();
/***
 * *
 * 
 * /users/fasd
 * /users
 * /users/sadfa
 * */ 

/** 
 * 
 * 1.Route :/users/users
 * Method : GET
 * Description: Get all single user 
 * Access: Public
 * * Parameters:None
 * 
 * *2. Route :users/users/:id
 * Method : GET
 * Description: Get all single user by id
 * Access: Public
 * * Parameters:None
 * 
 * 3.Route :users/users/:id
 * Method : POST
 * Description: Create new user
 * Access: Public
 * * Parameters:None
 * 
 * 4.Route :users/users/:id
 * Method : PUT
 * Description: Create new user
 * Access: Public
 * * Parameters:ID
 * 
 * 5.Route :users/users/:id
 * Method : DELETE
 * Description: Delete a user by id
 * Access: Public
 * * Parameters:id
 * 
 * 
 * */

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
      });
    });

router.get('/:id',(req,res)=>{
    const {id} = req.params
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
        });
    }
   return  res.status(200).json({
    success : true,
    data : user,
   });
});


router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = 
    req.body;

    const user = users.find((each) => each.id === id);

    if(user) {
        return res.status(404).json({
            success : false,
            message : "User exists with this id",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,

    });

    return res.status(201).json({
    success : true,
    date : user,
    });
});

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body; 

    const user = users.find((each) => each.id === id);
     
    if(!user) return res.status(404).json({
        success:false,
        message : "User not found" 
    });
    const updatedUser = users.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data,
            };    
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data : updatedUser,
    })

});

router.delete('/:id',(req,res) =>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message:"User to be deleted was not found",
        });
    }

    const index = users.indexOf(user);
    users.splice(index,1);

    res.status(202).json({success : true,data : users});

});

module.exports = router;

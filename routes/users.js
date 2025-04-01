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
 * 2. Route :users/users/:id
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
 * 6.Route :users/subscription-details/:id
 * Method : DELETE
 * Description: Get all user subscription details
 * Access: Public
 * * Parameters:id
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
    });

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

router.get('/subscription-details/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user) return res.status(404).json({
        success:false,
        message: "User not found",
    });

    const getDateInDays = (data = "") => {
    let date;
    if(data === ""){
        // current date
      date = new Date();
      }else{
        // getting date on basic of data variable
        date = new Date(data);
      }
      let days = Math.floor(date.getTime()/ (1000 * 60 * 60 * 24));
      return days;
    };
    const subscriptionType = (date)=>{
        let days = getDateInDays(date);
        if(user.subscriptionType === "Basic"){
            days += 90;
        }else if(user.subscriptionType === "Standard"){
            days += 180;
        }
        else if(user.subscriptionType === "Premium"){
        days += 365;
        }
        return days;
    };

    //Subscription expiration calculation
    //January 1,1970,UTC. // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    console.log("Return Date",returnDate);
    console.log("Current Date",currentDate);
    console.log("Subscription Date",subscriptionDate);
    console.log("Subscription expiry date",subscriptionExpiration);

    const data = {
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration > currentDate ?  subscriptionExpiration - currentDate:0,
        fine :
        returnDate < currentDate ? 
        subscriptionExpiration <= currentDate ? 200 : 100 : 0,
    };
    res.status(200).json({
        success:true,
        data,
    });
    
});

module.exports = router;

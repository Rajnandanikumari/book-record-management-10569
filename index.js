const express = require("express");
//JSON data import
const {users} = require('./data/users.json');

const app = express();

const PORT = 8081; 

app.use(express.json()); 

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "Server is up and running",
    });
});
/** 
 * 
 * 1.Route :/users
 * Method : GET
 * Description: Get all single user 
 * Access: Public
 * * Parameters:None
 * 
 * *2. Route :/users/:id
 * Method : GET
 * Description: Get all single user by id
 * Access: Public
 * * Parameters:None
 * 
 * 3.Route :/users/:id
 * Method : POST
 * Description: Create new user
 * Access: Public
 * * Parameters:None
 * 
 * 4.Route :/users/:id
 * Method : PUT
 * Description: Create new user
 * Access: Public
 * * Parameters:ID
 * 
 * */


app.get('/users/:id',(req,res)=>{
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

app.get("/users",(req,res)=>{
res.status(200).json({
    success:true,
    data:users,
  });
});

app.post("/users",(req,res)=>{
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

app.put("/users/:id",(req,res)=>{
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

app.get("*",(req,res)=>{
    res.status(404).json({
        message: "This route does not exist",
    });
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

// http://localhost:8081
const express = require("express");
const {books}  = require("../data/books.json");
const {users}  = require("../data/users.json");


const router = express.Router();

/*1.Route :/books
 * Method : GET
 * Description: Get book by id
 * Access: Public
 * * Parameters:none
 * 
 * 2.Route :/books/:id
 * Method : GET
 * Description: Get book by id
 * Access: Public
 * * Parameters:id
 * 
 * 3.Route :/books/issued/books
 * Method : GET
 * Description: Get book by id
 * Access: Public
 * * Parameters:none 
 * 
 * 4.Route :/books/issued/by-user
 * Method : GET
 * Description: Get book by id
 * Access: Public
 * * Parameters:none
 * 
 * */

router.get("/",(req,res)=>{
    res.status(200).json({success:true,data: books});
});

router.get('/:id',(req,res)=>{
    const {id} = req.params;

    const book = books.find((each)=>each.id === id);

    if(!book)
        return res.status(404).json({
               success: false,
               message: "Book not found",
    });

    return res.status(200).json({
        success:true,
        data:book,
    })
})

router.get("/issued/by-user",(req,res) =>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });
    
    // console.log(users);
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each) =>{
        const book = books.find((book) => book.id === each.issuedBook);
        
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);
    });

    if(issuedBooks.length === 0)
        return res.status(404).json({
        success:false,
        message: "No books issued yet",
    });
    return res.status(200).json({
        success:true,
        data:issuedBooks,

    });

});


//default export
module.exports = router;
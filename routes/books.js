const express = require("express");
const {books}  = require("../data/books.json");
const {users}  = require("../data/users.json");
const { getAllBooks, getSingleBookById, getAllIssueBooks} = require("../controllers/book-controller");


// const BookModel = require('.,/models/book-model')
// const UserModel = require('.,/models/user-model')

const router = express.Router();


// router.get("/",(req,res)=>{
//     res.status(200).json({success:true,data: books});
// });
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
 * 4.Route :/books
 * Method : POST
 * Description: Create new book
 * Access: Public
 * * Parameters:none
 *
 * 5.Route :/books/issued/by-user
 * Method : GET
 * Description: Get book by id
 * Access: Public
 * * Parameters:none
 * Data : author,name,genre,price,publisher
 *
 * 6.Route :/books/:id
 * Method : PUT
 * Description: Update book
 * Access: Public
 * * Parameters:id
 * Data : author,name,genre,price,publisher
 * */



router.get("/",getAllBooks);

router.get("/:id",getSingleBookById);
    
//     const {id} = req.params;

//     const book = books.find((each)=>each.id === id);

//     if(!book)
//         return res.status(404).json({
//                success: false,
//                message: "Book not found",
//     });

//     return res.status(200).json({
//         success:true,
//         data:book,
//     })
// })

router.get("/issued/by-user",getAllIssueBooks)

// router.get("/issued/by-user",(req,res) =>{
    // const usersWithIssuedBooks = users.filter((each)=>{
    //     if(each.issuedBook) return each;
    // });
    
    // // console.log(users);
    // const issuedBooks = [];
    // usersWithIssuedBooks.forEach((each) =>{
    //     const book = books.find((book) => book.id === each.issuedBook);
        
    //     book.issuedBy = each.name;
    //     book.issuedDate = each.issuedDate;
    //     book.returnDate = each.returnDate;
    //     issuedBooks.push(book);
    // });

    // if(issuedBooks.length === 0)
    //     return res.status(404).json({
    //     success:false,
    //     message: "No books issued yet",
    // });
    // return res.status(200).json({
    //     success:true,
    //     data:issuedBooks,

    // });

// });

router.post('/',(req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(404).json({
        success:false,
        message:"No data provided",
        });

    }
    const book = books.find((each)=> each.id === data.id);

    if(book){
        return res.status(404).json({
            success: false,
            message: "Book already exists with this id, please use a unique id",
        });
    }
    const allBooks = [...books,data];
    return res.status(201).json({
        success: true,
        data: allBooks,
    });

});

router.put('/:id',(req,res) =>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(400).json({
            success:false,
            message:"Book not found with this particular id",
        });
    }

    const updateData = books.map((each) =>{
        if(each.id === id){
            return {...each,...data};
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data: updateData,
    })
});


//default export
module.exports = router;
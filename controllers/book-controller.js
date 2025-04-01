const {BookModel,UserModel} = require("../models");
const { router } = require("../routes/books");


exports.getAllBooks = async(req,res) => {
    const books = await  BookModel.find();

    if(books.length === 0)
        return res.status(404).json({
        success:false,
        message:"No book found",
});

res.status(200).json({
    success:true,
    data:books,
});
};

exports.getSingleBookById = async(req,res) => {
    const {id} = req.params;

    const book = await BookModel.findById(id);

    if(!book)
        return res.status(404).json({
               success: false,
               message: "Book not found",
    });

    return res.status(200).json({
        success:true,
        data:book,
    });
};

exports.getAllIssueBooks = async(req,res)=>{
    const users = await userModel.find({
        issuedBook: {$exists: true},//agar book exist kr ta hai to ye book le kr aayega
    }).populate("issuedBook"); //populate or information collect krega

    const issuedBooks = users.map((each)=> new IssuedBook(each));    
    if(issuedBooks.length === 0)
        return res.status(404).json({
        success:false,
        message: "No books issued yet",
    });

    return res.status(200).json({
        success:true,
        data:issuedBooks,

    });
}



# book-record-management-10567
This is a book record management API Backend for the management of records and books 

# Routes and Endpoints 

## /users/{id}
GET: Get a user by id ✅
PUT: Update a user by id
DELETE: Delete a user by id (check if he/she still an issued book.) (is there any fine to be paid)

## /users/subscription-details/{id}
GET: Get user subscription details 
1.Date of subscription
2.Valid till
3.Fine if any 

## /books
GET: Get all books ✅
POST: Create/Add new book✅


## / books/{id}
GET: Get a book by id ✅
PUT: Update a book by id ✅

## /books/issued/by-user
GET: Get all issued books


## /books/issued/withFine
GET:Get all issued books with fine


# Subscription Types 
Basic    (3 months)
Standard (6 months)
Premium(12 months)

dates will be in format mm/dd/yyyy

If the subscription date is 01/10/22
and Subscription type is Standard 
the valid till date will be 01/02/23

If he has an issued book and the issued book is to be retured at 01/01/23 and he misses it, then he gets  a fine of Rs. 100./

If  he has an issued book and the issued book is to be retured at 01/01/23
If he missed the date of return,and his subscription also expires, then he will get a fine of Rs 200./

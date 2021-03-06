var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Get all books
app.get(apiversion + '/books',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM books', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'books list', data: results });
  });

  
});

//Get book by id
app.get(apiversion + '/book/:bookid',  function (req, res)  {  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var bookid = Number(req.params.bookid);
  
  db.query('SELECT * FROM books where bookid=?', bookid.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'book id =' + bookid.toString(), data: results });
  });

});

//Get student by id
app.get(apiversion + '/student/:studentid',  function (req, res)  {  


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var studentid = Number(req.params.studentid);
  
  db.query('SELECT * FROM student where studentid=?', studentid.toString(),function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'student id =' + studentid.toString(), data: results });
  });


});

//get student การบ้าน
app.get(apiversion + '/student',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM student', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'student list', data: results });
  });

  
});


//put student
app.put(apiversion + '/student/:studentid',  function (req, res)  {  

  var studentid = req.body.studentid;
  var studentName = req.body.studentName;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`UPDATE student 
            Set
               studentid = '${studentid}',
               studentName = '${studentName}'
  
            where studentid='${studentid}';`,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' Modified student' });
   });

});


//Delte student
app.delete(apiversion + '/student/:studentid',  function (req, res)  {  

  var studentid = req.params.studentid;

  res.setHeader('Co2ntent-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`DELETE from student WHERE studentid =${studentid};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Modified student' });
  });

   
});





//Delete book by id
app.delete(apiversion + '/book/:bookid',  function (req, res) {


  var bookid = req.params.bookid;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`DELETE from books WHERE bookid = ${bookid};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Modified book' });
  });

});

  //Add new book
app.put(apiversion + '/book/:bookid',  function (req, res)  {  


  var title = req.body.title; 	
  var price=req.body.price;
	var isbn = req.body.isbn;
	var pageCount = req.body.pageCount;
	var publishedDate=req.body.publishedDate;
	var thumbnailUrl=req.body.thumbnailUrl;
  var shortDescription=req.body.shortDescription;
  var author=req.body.author;
  var category=req.body.category;
  
  var bookid=req.params.bookid;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      db.query(`UPDATE books
              SET
                title="${title}",
                price=${price},
                isbn="${isbn}",
                pageCount= ${pageCount},
                publishedDate="${publishedDate}", 
                thumbnailUrl="${thumbnailUrl}", 
                shortDescription="${shortDescription}",
                author="${author}",
                category="${category}",
              WHERE bookid= ${bookid} ;`,function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'Insert new book' });
     });
              
  });
    
    
 

//Add new student post
app.post(apiversion + '/student',  function (req, res) {

  var studentid = req.body.studentid
  var studentName = req.body.studentName

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  db.query(`INSERT INTO student (studentid,studentName) VALUES ('${studentid}','${studentName}');` ,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: 'Insert new student' });
  });


});


//Edit book by id
app.put(apiversion + '/book/:bookid',  function (req, res)  {  


  //Code for Edit


});

//test

app.listen(port, function () {
    console.log("Server is up and running...");
});



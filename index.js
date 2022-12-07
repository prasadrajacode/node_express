const express = require('express');
const exphbs  = require('express-handlebars'); 
const path = require('path');
const members = require('./Members');
const router = require('./routes/api/membersCRUD');
const logger = require('./logger');
const app = express();

// Handlebars Middleware
//https://stackoverflow.com/questions/69959820/typeerror-exphbs-is-not-a-function
app.engine('handlebars', exphbs.engine({defaultLayout :'main'}));
app.set('view engine', 'handlebars');

// Homepage Route
//this can be moved to a separate file simplar to member api routes 
app.get('/index', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

//app.use(router);
app.use('' ,router);

// app.get('/api/members',(req,res) => {
//   res.json(members);
// });

// // Get Single Member
// const idFilter = req => member => member.id === parseInt(req.params.id);
// app.get('/api/members/:id', (req, res) => {
//     console.log(req.params.id);
//     const found = members.some(member => member.id == req.params.id);
//     if(found){
//         res.json(members.filter(member => member.id == req.params.id)); 
//     }
//     else{
//         res.json('Not Found');
//     }    
//   });


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
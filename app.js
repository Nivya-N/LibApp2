const express = require('express');
const app = express();
const port = process.env.PORT||3000;


const data= [
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/signin',name:'Sign In'
    },
    {
        link:'/signup',name:'Sign Up'
    },
    {
        link:'/admin',name:'Add Books'
    },
    {
        link:'/addauthors',name:'Add Authors'
    }
    
];

const userNav = [
    {
        link:'/user/authors',name:'Authors'
    },
    {
        link:'/user',name:'Books'
    }
]


const booksRouter = require('./src/routes/bookRoutes')(data)
const authorsRouter = require('./src/routes/authorRoutes')(data)
const signinRouter=require('./src/routes/signinRoutes')(data)
const signupRouter=require('./src/routes/signupRoutes')(data)
const adminRouter=require('./src/routes/adminRouter')(data)
const addauthorRouter=require('./src/routes/addauthorRouter')(data)
const userRouter = require('./src/routes/userRoutes')(userNav);

app.use(express.urlencoded({extended:true}));//middleware for post
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/signin',signinRouter);
app.use('/signup',signupRouter);
app.use('/admin',adminRouter);
app.use('/addauthors',addauthorRouter);
app.use('/user',userRouter);



app.get('/',function(req,res){
    res.render("index",   
     {
        data,
        title:'Library'
        
    });
});




app.listen(port,()=>{console.log("Server ready at" + port)});
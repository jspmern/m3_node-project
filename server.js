let express=require('express')
let dotenv=require('dotenv')
let app=express()
//middlware for env
dotenv.config()
//middlware for reqbody
app.use(express.json())
//setting engine
app.set('view engine','ejs')
//static serve
app.use(express.static('views'))
let port=process.env.PORT || 8000
//basic route
app.get('/',async(req,res)=>{
    res.render('pages/index')
})

//server listing
app.listen(port,()=>{
    console.log(`server is up at http://localhost:${port}`)
})
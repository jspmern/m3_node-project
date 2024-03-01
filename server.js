let express=require('express')
let dotenv=require('dotenv')
let fs=require('fs')
let path=require('path')
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
//Error middlware
app.use((err,req,res,next)=>{
    if(err)
    {
        res.status(500).send({message:"Somthing wrong !",success:false})
    }
    else{
        next()
    }
})

//basic route
app.get('/',async(req,res)=>{
    res.render('pages/index')
})
app.get('/admin',async(req,res)=>{
    try{
        res.render('pages/Admin')
    }
    catch(err)
    {
         throw new Error(err.message)
    }
})
app.post('/admin',async(req,res)=>{
    try{
        let {name,qul,phone,course,id}=req.body
        if(!name || !qul || !phone || !course || !id)
        {
            return res.status(500).send({message:"All field is required*",success:false})
        }
        else{
                fs.readFile(path.join(__dirname,'db/db.json'),'utf-8',(err,data)=>{
                    if(err)
                    {
                        throw new Error(err.message)
                    }
                    else{
                        let orginalData=JSON.parse(data)
                        orginalData.push({...req.body})
                        fs.writeFile(path.join(__dirname,'db/db.json'),JSON.stringify(orginalData),(err)=>{
                            if(err)
                            {
                             throw new Error(err.message)
                            }
                            else{
                                 res.send(orginalData)
                                
                            }
                        })
                    }
                })
        }
          
    } 
    catch(err)
    {
        throw new Error(err.message)
    }
})
app.get('/faculty',async(req,res)=>{
     
    try{
        fs.readFile(path.join(__dirname,'db/db.json'),'utf-8',(err,data)=>{
            if(err)
            {
                throw new Error(err.message)
            }
            else{
                let orginalData =JSON.parse(data)
                res.render('pages/Faculty',{title:"All Faculty Details",data:orginalData})
            }
        })
       
       
    }
    catch(err)
    {
        throw new Error(err.message)
    }
})

//server listing
app.listen(port,()=>{
    console.log(`server is up at http://localhost:${port}`)
})





//.....................................without fetch.................
// let str=''
// req.on('data',(chunk)=>{
//        str+=chunk
// })
// req.on('end',()=>{
//     console.log(str)
//    let formData=  new URLSearchParams(str)  //its convert string into formData
//   //input: //uname=dfkjdkj&qul=fkjdkjf&phone=dfjdsj&dep=mern
//  //output: { 'uname' => 'dfkjdkj', 'qul' => 'fkjdkjf', 'phone' => 'dfjdsj', 'dep' =>
//   //'mern' }
//    console.log(formData)
//    console.log(formData.get('uname'))
//     res.send('done')
// })
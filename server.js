const path = require('path')
const fs = require('fs')
const express = require('express')
const dotenv = require('dotenv')
const cacheMiddleware=require('/cache/cacheMiddleware.js')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/products',cacheMiddleware,(req,res)=>{
    const datapath = path.join("data","products.json")
    const products = JSON.parse(fs.readFileSync('products.json'), "utf-8")

    setTimeout(()=>{
        res.json(()=>{
            sucess=true,
            source='database',
            data='products';

        })

    },2000);



});

app.get('/',(req,res)=>{
    res.send("Welcome to CacheCraft 🚀 - Custom Caching Layer for APIs")


});
app.listen(PORT,(req,res)=>{\
    app.send("Server running on http://localhost:${PORT}");
})


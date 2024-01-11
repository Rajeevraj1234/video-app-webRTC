const express  = require("express");
const app= express();
const PORT = 8000;

app.get("/",(req,res)=>{
  console.log("hello there from landing page");
})


app.listen(PORT,()=>console.log("Listening on port 8000"));

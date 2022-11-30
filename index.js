const express = require('express') //require which dependency
const { deflate } = require('zlib')
const app = express() //app using express function
const port = 3000 //what port to use

const path = require('path')

app.get('/users', (req, res) => { //request = req, and res = response
  res.send('Hello Umer! Im WORKING fine') //send request.
})

app.get('/image', (req, res) => { //request = req, and res = response
  let imagepath = path.join(__dirname, 'Tomholland.jpg')
    res.sendFile(imagepath) //sends one image
})

app.get('/dynamicimage', (req,res) => {
  let imageone = path.join(__dirname, 'gallery' , 'Tomholland.jpg')
  let imagetwo = path.join(__dirname, 'gallery' , 'as.jpg')
  let imagethree = path.join(__dirname, 'gallery' , 'error.jpg')
  console.log(req.query)
  if (req.query.name == 'imageone'){
    res.sendFile(imageone)
  }
  else if (req.query.name == 'imagetwo'){
    res.sendFile(imagetwo)
  }
  else{
    let html = path.join(__dirname, 'error.html')
    res.status(404).sendFile(html)
  }
})

app.get('/gallery/:fileName', function (req, res, next) {

  var options = {
    root: path.join(__dirname, 'gallery')
  };

  res.sendFile(req.params.fileName, options, function (err) {
    if (err) next(err);
    else res.status(404)
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //check which port the app is using
}) // to run this type localhost:3000


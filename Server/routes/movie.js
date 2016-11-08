var express=require('express')
var mongoose=require('mongoose')
var movieObj=require('../model/movie');
var app=express();

//post method

app.post('/add',function(req,res){
  var movie =new movieObj(req.body);

  movie.save(function(err){
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("Movie inserted");
    }
  })
});

///////////////Display method///////////

app.get('/display',function(req,res,next){
  movieObj.find({},function(err,data){
    if(err){
      res.send("error in get");
    }
    else {
      console.log("successfully displayed");
      res.json(data);
    }
  })
}
);

/////////////Delete///////////////////

app.delete('/delete/:id',function(req,res,next){
  console.log(req.params.id);
  movieObj.findOneAndRemove({imdbID: req.params.id}, function (err,offer){
    if(err) { res.send(err);

      console.log(err);
     }
    else{
     console.log("successfully deleted");
      //next();
    }
  })
  movieObj.find({},function(err,data){
    if(err){
      res.send("error in get");
    }
    else {
      console.log("successfully displayed");
      res.json(data);
    }
  });
});

////////Update/////////////////

app.put('/update/:imdbID/:Title',function(req,res,next){

  movieObj.update({imdbID: req.params.imdbID} , {Title: req.params.Title} , function (err,movies) {
    if (err) {res.send(err);}
    else{
        console.log("Update successful");
      movieObj.find({},function(err,data){
        if(err){
          res.send("error in get");
        }
        else {
          console.log("successfully displayed");
          res.json(data);
        }
      });
    }
  });

});
module.exports=app;

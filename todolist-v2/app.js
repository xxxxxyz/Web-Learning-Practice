//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect mongoose
mongoose.connect("mongodb+srv://xiayuze0406:xyz199046@cluster0.l0bffap.mongodb.net/todolistDB", {useNewUrlParser: true}); 

//create a Schema
const itemsSchema = {
  name: String
}
//compiling model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome!"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item."
});

const item3 = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2,item3];

// create a List Schema
const listSchema = {
  name: String,
  items:[itemsSchema]
};

// compiling List model
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({})
  .then(foundItem => {
    if (foundItem.length === 0) {
      return Item.insertMany(defaultItems);
    } else {
      return foundItem;
    }
  })
  .then(savedItem => {
    res.render("list", {
      listTitle: "Today",
      newListItems: savedItem
    });
  })
  .catch(err => console.log(err));
  
});

app.post("/", function(req, res){
 
  // get the input
  const itemName = req.body.newItem;
  
  // create the new item instance
  const item = new Item({name:itemName});
  // save the new item instance into the db
  // based on the callback to redirect 
  item.save()
    .then(res.redirect("/"))
    .catch(err => console.log(err));

  // Item.collection.insertOne({name:itemName})
});



app.post("/delete", function(req, res){
 
  const checkedItemId = req.body.checkbox.trim();
  const listName = req.body.listName;
  
  if(listName === "Today") {
  
    Item.findByIdAndRemove(checkedItemId).then(function(foundItem){Item.deleteOne({_id: checkedItemId})})
  
    res.redirect("/");
  
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(function (foundList)
      {
        res.redirect("/" + listName);
      });
  }
   
});



app.get("/:customListName", function(req, res){
  
  const customListName = req.params.customListName;
 
  List.findOne({name:customListName})
    .then(function(foundList){
        
          if(!foundList){
            const list = new List({
              name:customListName,
              items:defaultItems
            });
          
            list.save();
            console.log("saved");
            res.redirect("/"+customListName);
          }
          else{
            res.render("list",{listTitle:foundList.name, newListItems:foundList.items});
          }
    })
    .catch(function(err){});


})



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

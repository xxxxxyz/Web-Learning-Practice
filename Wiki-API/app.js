//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



//Connection of mongodb;
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//create schema;
const articleSchema = {
    title: String,
    content: String
}

//model;
const Article = mongoose.model("Article", articleSchema);

// -------------------------------  Requests Targeting all Articles ---------------------------------//

app.route("/articles")
.get(
    async(req,res) => {
        try{
            const foundArticles = await Article.find();
            res.send(foundArticles);
        }catch(err) {
            res.send(err);
        }
    }
    )
    .post(
        async(req,res) => {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
            
            newArticle.save()
            .then(success => {
                console.log("Successfully added a new article");
            })
            .catch(err => {
                console.log(err);
            });
            
        }
        )
        .delete(
            (req,res) => {
                Article.deleteMany()
                .then(function(req,res) {
                    res.send("successfully deleted all articles");
                })
                .catch(err => {
                    res.send(err);
                });
            }
            );
            

// -------------------------------  Requests Targeting a Specific Article ---------------------------------//

app.route("/articles/:articleTitle")
    .get(
        async(req,res) => {
            
                const foundArticle = await Article.findOne({title: req.params.articleTitle});

                if(foundArticle) {
                    res.send(foundArticle);
                }else {
                    res.send("No articles matching that title was found.")
                };
           
        }    
    )
    .put(
        async(req, res) => {
            try {
                const { articleTitle } = req.params;
                const { title, content } = req.body;
            
                const result = await Article.replaceOne(
                  { title: articleTitle },
                  { title, content },
                  { overwrite: true }
                );
            
                if (result.modifiedCount === 1) {
                  res.send('Success');
                } else {
                  res.send(`Article '${articleTitle}' not found`);
                }
              } catch (err) {
                res.status(500).send(err.message);
              }
        }
    )
    .patch(
        (req, res) => {

        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body})
            .then(err => {
                if(!err){
                    res.send("Successfully update");
                } else {
                    res.send(err);
                }
            });
        }
    )

    .delete(
        (req, res) => {
            Article.findOneAndDelete(
                {title: req.params.articleTitle}
            )
            .then(err => {
                if(!err) {
                    res.send("Success.");
                } else {
                    res.send(err);
                }
            })
        }
    );


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
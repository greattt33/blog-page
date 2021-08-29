

const home="HOME";
const express= require("express");
const posts=[];

const userInfo=[];

const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB",{useUnifiedTopology:true,useNewUrlParser:true});


const personDetailsSchema=new mongoose.Schema({
	name:String,
	Email:String,
	preference:String
}) 

const PersonDetail= mongoose.model("PersonDetail",personDetailsSchema);

const personDetail= new PersonDetail({
	name:"adebayo mojeed",
	Email:"adebayodayo221@yahoo.com",
	preference:"tech"
})

//personDetail.save();

const shola= new PersonDetail({
	name:"Shola Akosile",
	Email:"sholaakosile33@gmail.com",
	preference:"sport"
})

const kunle= new PersonDetail({
	name:"Shola Akosile",
	Email:"sholaakosile33@yahoo.com",
	preference:"fashion"
})

const manga= new PersonDetail({
	name:"manga Akosile",
	Email:"sholaakosile33@outlook.com",
	preference:"luxury"
})

/*PersonDetail.insertMany([shola,kunle,manga],function(err){
	if(err){
		console.log(err)
	}else{
		console.log("sucess");
	}
})*/
PersonDetail.find(function(err,PersonDetail){
	if(err){
		console.log(err)
	}else{
		PersonDetail.forEach(function(PersonDetail){
			console.log(PersonDetail.name);
			mongoose.connection.close();
		})
			
		}
	}
	)
	
const bodyParser= require("body-parser");
const _= require("lodash");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/",(request,response)=>{
	response.sendFile(__dirname+"/")
	response.render("home",{
		HOME:home,
		newBlog:posts,
	
});
})

app.get("/sign-up",(request,response)=>{
	
	response.sendFile(__dirname+"/sign-up");
	 
	response.render("sign-up",{
		
	})
})
app.get("/user",(request,response)=>{
	response.sendFile(__dirname+"/user");
	response.render("user",{
		newBlog:posts,
	})
})

app.get("/profile",(request,response)=>{
	response.sendFile(__dirname+"/profile");
	
	response.render("profile",{
		User:userInfo,
	})
})
app.get("/welcome",(request,response)=>{
	response.sendFile(__dirname+"/welcome");
	response.render("welcome",{

		
	});
});
app.get("/sign-in",(request,response)=>{
	response.sendFile(__dirname+"/sign-in");
	response.render("sign-in",{
		
	});
})


app.get("/compose",(request,response)=>{
	response.sendFile(__dirname+"/compose");
	response.render("compose",{
		
	})
})

app.post("/",(request,response)=>{
	const composeWord= request.body.words;
	const composeTitle= request.body.title;
	
	const post={
		title:composeTitle,
		message:composeWord,
	}
	posts.push(post);
	response.redirect("/");
	response.send();
})
app.post("/user",(request,response)=>{
	response.redirect("/user")
	response.send();
})
app.post("/profile",(request,response)=>{
	const userFullNname= request.body.Fullname;
	const userEmail= request.body.email;
	const interest = request.body.interest;
	const info={
		Fullname:userFullNname,
		Email:userEmail,
		Intrest:interest,
	}
	userInfo.push(info);
	response.redirect("/user");
	response.send();
});
app.get("/post/:topic",(request,response)=>{
	const newTopic= _.lowerCase(request.params.topic);
	posts.forEach((post)=>{
		const newTitle= _.lowerCase(post.title);
		if(newTopic===newTitle){	
		response.render("post",{
			Title:post.title,
			Content:post.message,
		})
	}}
	)
});

app.listen(3000,(request,response)=>{
	console.log("server is running");
})
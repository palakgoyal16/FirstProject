var express = require("express");
var mysql2 = require("mysql2");
var fileuploader=require("express-fileupload");

let app = express();

app.listen(2002, function () {
    console.log("Server Started   :-)");
})
app.use(express.static("public"));
app.use(express.urlencoded("true"));// converts binary form data to JSON Object

app.use(fileuploader());

//********************************connect to mysql****************
//let config = {
   // host: "127.0.0.1",
  //  user: "root",
  //  password: "palak@123",
  //  database: "project",
  //  dateStrings: true,
//}
let config = {
    host: "blntfbaqsloi5adoodir-mysql.services.clever-cloud.com",
    user: "udmaawmlx5xoijdr",
    password: "y6mcgTW7du5K0VhyVlaY",
    database: "blntfbaqsloi5adoodir",
    dateStrings: true,
    keepAliveInitialDelay :10000,
   enableKeepAlive:true,

}
app.get("/", function (req, resp) {
    let path = __dirname + "/public/index.html";
    resp.sendFile(path);

})
// Console te koln vste phela dash button bnya index page te fr ohnu hun directory dete hai ohnu path milje console te

app.get("/dash", function (req, resp) {
    let path = __dirname + "/public/infl-dash.html";
    resp.sendFile(path);

})
var mysql = mysql2.createConnection(config);
mysql.connect(function (err) {
    if (err == null)
        console.log("Connected To Database Successfulllyyyy");
    else
        console.log(err.message);

})
//url deta c jeda piche jquery ch data ch ode help nll ure akke mysql te table ch rhya
app.get("/sign-data", function (req, resp) {

    mysql.query("insert into users values(?,?,?,1)", [req.query.stxtemail, req.query.stxtpwd, req.query.combo], function (err) {
        if (err == null) {
            resp.send("Signed Up Successfully");
        }

        else {
            resp.send(err.message);
        }

    })
});
// **********connect to login page**********
app.get("/login-data", function (req, resp) {

    mysql.query("select * from users where email=? and pwd=?", [req.query.lemail, req.query.lpwd], function (err, result) {

        if (err != null) {
            resp.send(err.message); return;
        }
        //table ch jake check kr rhya ki value same h ya nhi agr same h tn ohdi length one hoju otherwise zero
        if (result.length == 0) {
            resp.send("Invalid Id or Password"); return; ''
        }
        // status one mtlb no blocked in table
        if (result[0].status == 1) {
            resp.send(result[0].utype); return;
        }
        else {
            resp.send("Your Are Blocked!!!"); return;
        }

    })
});
app.post("/inf-save", function (req, resp) {
    console.log(req.body);
    // it is used for to check in console that your parameter is passed or not  ,match the console and mysql whether is changed is same in counts what is passes od rnot
    let fileName = "";
    if (req.files != null) {
        fileName = req.files.ppic.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.ppic.mv(path);
    }
    else
        fileName = "nopic.jpg";

    //req.body.ppic=fileName;
    //resp.send(req.body);

    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.iemaill, req.body.finf, req.body.igen, req.body.idob, req.body.iad, req.body.icty, req.body.icon, req.body.iff.toString(), req.body.iinst, req.body.ifb, req.body.iyb, req.body.ioth, fileName], function (err) {
        if (err == null)
            resp.send("Bahut Bahut Badhai.....");
        else
            resp.send(err.message);
    })
})
app.post("/inf-update", function (req, resp) {
    console.log(req.body);

    let fileName = "";
    if (req.files != null) {
        fileName = req.files.ppic.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.ppic.mv(path);
    }
    else {
        fileName = req.body.hdn;
    }

    //req.body.ppic=fileName;
    //resp.send(req.body);

    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update iprofile set iname=?, gender=? ,dob=?,address=?,city=?,contact=?,fields=?,insta=?,fb=?,youtube=?,others=?, picpath=? where emailid=?", [req.body.finf, req.body.igen, req.body.idob, req.body.iad, req.body.icty, req.body.icon, req.body.iff.toString(), req.body.iinst, req.body.ifb, req.body.iyb, req.body.ioth, fileName,req.body.iemaill], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})

app.get("/post-event", function (req, resp) {
    console.log(req.query);
    // null add kita ik singer de kiniya(multiple) v bookings ho skdiya je ohne koi delete krni h tn bhut ik nll de multi id letiya jangyia
    // eh lan nll oh ik booking dlt kr skda(see my sql)

    mysql.query("insert into eventss values(null,?,?,?,?,?,?)", [req.query.emll, req.query.evtt, req.query.ddd,req.query.stt, req.query.ctyy, req.query.ven], function (err) {
        if (err == null) {
            resp.send("Signed Up Successfully");
        }

        else {
            resp.send(err.message);
        }

    })
});

app.get("/find-user-details",function(req,resp)
{
   
 let iemaill=req.query.iemaill;
    mysql.query("select * from iprofile where emailid=?",[iemaill],function(err,resultJsonAry){
        
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        //console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
//*******update password********************************
app.post("/update-setting", function (req, resp) {
    console.log(req.body);
    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update users set pwd=?,  where email=? and pwd=?", [req.body.conf, req.body.mail,req.body.old], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})
//------------------
//check email nd old pwd
app.get("/update-pwd", function (req, resp) {

    mysql.query("select * from users where email=? and pwd=?", [req.query.mail, req.query.old], function (err, result) {
        if (err) {
            resp.send(err.message);
        } else {
            if (result.length == 1) {
                if (result[0].ustatus == 1) {
                    resp.send("Valid");
                    return;
                } else {
                    resp.send("U r Blocked!!!");
                }
            } else {
                resp.send("Invalid Email or Password");
            }
        }
    })

})
//------------------
app.get("/addash", function (req, resp) {
    let path = __dirname + "/public/admin-dash.html";
    resp.sendFile(path);

})

app.get("/admin-users-page",function(req,resp)
{
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})
app.get("/admin-all-influ",function(req,resp)
{
    let path=__dirname+"/public/admin-all-influ.html";
    resp.sendFile(path);
})

app.get("/fetch-all-emails",function(req,resp)
{
    mysql.query("select distinct email from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

app.get("/fetch-all",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        //"select * from users where utype='influencer' "(we wnat any specific data to fetch)
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

app.get("/blo-one",function(req,resp)
{
    mysql.query("update users set status=0 where status=1 and email=?;",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Blocked");
       
    })

})
app.get("/res-one",function(req,resp)
{
    mysql.query("update users set status=1 where status=0 and email=?;",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Resume");
       
    })

})
app.get("/del-one",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})
//--------------------------------------------------------------
app.get("/influu", function (req, resp) {
    let path = __dirname + "/public/influ-finder.html";
    resp.sendFile(path);

})

app.get("/fetch-all-emaill",function(req,resp)
{
    mysql.query("select distinct email from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

app.get("/fetch-inf",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
app.get("/fetch-all-fields",function(req,resp)
{
    console.log("heyyy");

    mysql.query("select distinct fields from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    }) 

})
app.get("/fetch-city",function(req,resp)
{
    //console.log("hlo");
    mysql.query("select * from iprofile where fields=?",[req.query.fields],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

app.get("/do-find",function(req,resp)
{

    console.log("lol");
    console.log(req.query);

    mysql.query("select * from iprofile where fields=? && city = ? ",[req.query.fields,req.query.city],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

});

app.get("/do-findbyname",function(req,resp)
{

    //console.log("....");
    //console.log(req.query.fields);

    mysql.query("select * from iprofile where iname like ?",["%"+req.query.iname+"%"],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

})
app.get("/fetch-clnt",function(req,resp)
{
    mysql.query("select * from eventss",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

app.get("/clnt-save", function (req, resp) {
    console.log(req.body);
    // it is used for to check in console that your parameter is passed or not  ,match the console and mysql whether is changed is same in counts what is passes od rnot
    //req.body.ppic=fileName;
    //resp.send(req.body);

    mysql.query("insert into cprofile values(?,?,?,?,?,?,?)", [req.query.cemaill, req.query.cinf, req.query.ccty, req.query.scty, req.query.ccon, req.query.cff, req.query.coth], function (err) {
        if (err == null)
            resp.send("Bahut Bahut Badhai.....");
        else
            resp.send(err.message);
    })
})
app.get("/clnt-update", function (req, resp) {
    console.log(req.body);
    //req.body.ppic=fileName;
    //resp.send(req.body);

    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update cprofile set cname=?, ccity=? ,cstate=?,moible=?,cfields=?,cothers=? where id=?", [req.query.cinf, req.query.ccty, req.query.scty, req.query.ccon, req.query.cff, req.query.coth,req.query.cemaill], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})
app.get("/admin-page",function(req,resp){
    let path=__dirname+"/public/admin-page.html";
    resp.sendFile(path);
})
app.get("/login-page",function(req,resp){
    mysql.query("insert into  admins where (?,?)",[req.query.em,req.query.tp], function(err,result){
        if(err!=null)
        //insert into users values(?,?,?,1)
        {
            resp.send(err.message);
            return;
        }
        else
        {
        resp.redirect("admin-dash.html");
    }
    })
})
app.get("/admin-users",function(req,resp){
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})

app.post("/update-setting-client", function (req, resp) {
    console.log(req.body);
    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update users set pwd=?,  where email=? and pwd=?", [req.body.conf, req.body.mail,req.body.old], function (err, result) {
        if (err == null)//no error
        {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})
//------------------
//check email nd old pwd
app.get("/update-pwd-client", function (req, resp) {

    mysql.query("select * from users where email=? and pwd=?", [req.query.mail, req.query.old], function (err, result) {
        if (err) {
            resp.send(err.message);
        } else {
            if (result.length == 1) {
                if (result[0].ustatus == 1) {
                    resp.send("Valid");
                    return;
                } else {
                    resp.send("U r Blocked!!!");
                }
            } else {
                resp.send("Invalid Email or Password");
            }
        }
    })

})

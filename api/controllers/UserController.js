/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	 findAlll : function(req,res) {    

	 	 User.find().exec(function(err, user) {
         if(err) {
            return res.send(err);
         }
         res.view('display',{'user' : user}); 
         });   
},

     viewInfo : function(req,res) {
         
         var id = req.param('id');
        // console.log(id);
        
     	 User.find({id : id},{select: ['username', 'password', 'id']}).exec(function(err, user) {
         if(err) {
            return res.send(err);
         }
        // console.log(user);
         res.view('view_all',{'user' : user}); 
         });   
},

     delete : function(req,res) {

     	var idd = req.param('id');
        
        User.destroy({ id : idd }).exec(function (err){
        if (err) {
           return res.send(err);
        }
        return res.send("Deleted");
        });
},

     create : function(req,res) {

       var param = req.params.all();        
       var uname = param.username; 
       var pass = param.password;

     //  console.log(uname);
     //  console.log(pass);
       User.find({username: uname}, {select: ['username']})      
       .exec(function(err, user) {
       if(err) {
           return res.send(err);
       }
       
       var data = {                        
                     user_data : user
                  };
       var len = data.user_data.length;
     
       if(len == 1)                                  
       {
          res.send("Username already taken!");
       }
       else
       {
          User.create({                               
                          username: uname,
                          password : pass})
                          .exec(function (err, user) {
                          if(err) {
                               return res.send(err);
                          }
                          return res.send("Created");
                      });
       }        
       });    
},

    change : function(req, res) {  
     var param = req.allParams();
     var new_username = param.usernm;
     var new_password = param.passwd;
     var idd = req.param('userid');
     //console.log(new_password);    
     //console.log(new_username);
     //console.log(idd);

       User.find({username: new_username}, {select: ['username']})      
       .exec(function(err, user) {
       if(err) {
           return res.send(err);
       }
       
       var data = {                        
                     user_data : user
                  };
       var len = data.user_data.length;
     
       if(len == 1)                                  
       {
          res.send("Username already taken!");
       }
       else
       {
          User.update({id : idd}, {username:new_username,password :new_password})
          .exec(function(err,user) { 
          if (err) {
           return res.send(err);
          }
           return res.send("Updated");
           //console.log(user);
           //res.view('view_all',{'user' : user});
          //res.redirect('/',{'user' : user}); 
        });
      }
     });  
   }
} 


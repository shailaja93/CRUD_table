/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 *User model related CRUD
 *@module user
 */
module.exports = {
   /**
   *Fetches all the records from User model and displays
   *@param {Object} req 
   *@param {object} res The res object contains "user" which contains details of all user
   *@returns {object} If error than err object gets returned 
   */
	 findAlll : function(req,res) {    

	 	 User.find().exec(function(err, user) {
         if(err) {
            return res.send(err);
         }
         res.view('display',{'user' : user}); 
         });   
},
  /**
   *Fetches the details of a specific user id passed
   *@param {Object} req object contains id to fetch its details
   *@param {object} res object contains details of a specific id passed
   *@returns {object} If error than err object gets returned 
   */
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
  /**
   *Deletes the details of a specific user id passed
   *@param {Object} req object contains id to delete its details
   *@param {object} res object contains the msg that is to be printed after deleting
   *@returns {object} If error than err object gets returned  
   */

     delete : function(req,res) {

     	var idd = req.param('id');
        
        User.destroy({ id : idd }).exec(function (err){
        if (err) {
           return res.send(err);
        }

        return res.send("Deleted");
        });
},
  /**
   *Creates new user after checking in the user model if the specified username is unique 
   *@param {Object} req object contains details to store
   *@param {object} res object contains the msg that is to be printed after creating
   *@returns {object} If error than err object gets returned  
   */

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
  /**
   *Updates the details of an old user 
   *@param {Object} req object contains new details to store
   *@param {object} res object contains the msg that is to be printed after updating
   *@returns {object} If error than err object gets returned  
   */

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



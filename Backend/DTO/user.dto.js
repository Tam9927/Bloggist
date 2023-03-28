'use strict'
 class UserDTO{
     constructor(user) {

         this.Id = user.Id;
         this.username = user.username;
         this.email = user.email;
         this.createdAt = user.createdAt;
         this.updatedAt = user.updatedAt;

     }
   }


   module.exports = UserDTO;
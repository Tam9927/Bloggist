 class UserDTO{
     constructor(user) {

        console.log(user);
         this.id = user.Id;
         this.username = user.username;
         this.email = user.email;
         this.createdAt = user.createdAt;
         this.updatedAt = user.updatedAt;

     }
   }


   module.exports = UserDTO;


const FindAllUsers = () => {

}

const FindUser = () => {

}



const CreateUser = ()=> {


    createUser = async (req,res) => {
        if(req.Password.length < 6){
            console.log('Password must be of atleast 6 characters');
        }
        const newUser = await UserRepository.createUser(req);
        console.log(newUser);
    }

}


 const UpdateUserById =  (id)=> {

return User.FindById(id);

}

const DeleteUser = () => {

}



module.exports =
{

    FindAllUsers,
    FindUser,
    CreateUser,
    DeleteUser,
    UpdateUserById

}



 
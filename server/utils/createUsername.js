import User from "../models/user.js"

export const createUsername =  (firstname) => {
    try{
        const user = User.findOne({firstName: firstname})

        if(!user){
            return firstname.toLowerCase();
        }

        return firstname.toLowerCase() + (Math.floor(Math.random() * 1000)).toString();
    }
    catch(error){
        throw new Error("Unable to create user")
    }
}
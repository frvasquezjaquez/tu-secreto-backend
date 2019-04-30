import { User } from '../modules/user/user.model';
import { ForbiddenError } from 'apollo-server-express'

// Check if is the correct user
const authenticationRequired = async (req,res) => {
  let token = req.cookies.auth_token;
  try {
    let user = await User.findBytoken(token);
    if(!user) return false;
    req.token = token;
    req.user = user;
    return token;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  authenticationRequired
}
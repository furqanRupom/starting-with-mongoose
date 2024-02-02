import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { UserModel } from "../modules/user/user.model"

const superUser = {
  id:'0001',
  password:config.super_admin_password,
  email:'furqanrupom978@gmail.com',
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}


const seedSuperAdmin = async() => {

  const isSuperAdminExits = await UserModel.findOne({role:USER_ROLE.superAdmin})

  if(!isSuperAdminExits){
    await UserModel.create(superUser);
  }
}

export default seedSuperAdmin;
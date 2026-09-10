import {User} from "../../DB/models/users.model.js";
export const getUserbyID = async (id) => {
return await User.findByPk(id,{
    attributes: { exclude: ['role'] }
});
}

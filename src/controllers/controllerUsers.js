import { getAllUsersDao } from "../model/usersDao.js";

export function getAllUsers(req, res, next){
    getAllUsersDao()
    .then((response) => {
        res.status(200).json(response)
    })
    .catch(err => res.status(502).json(err));
}
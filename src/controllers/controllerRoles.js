import { getAllRolesDao } from "../model/rolesDao.js";

export function getAllRoles(req, res) {
    getAllRolesDao()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch(err => res.status(400).json(err));
}
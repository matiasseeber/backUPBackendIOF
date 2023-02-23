import { getAllPermissionsDao } from "../model/permissionsDao.js";

export function getAllPermissions(req, res, next){
    getAllPermissionsDao()
    .then(({rows}) => {
        res.status(200).json(rows);
    })
    .catch(err => res.status(502).json(err));
}
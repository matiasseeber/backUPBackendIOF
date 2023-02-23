import { getAllDeviceTypesDao } from "../model/deviceTypesDao.js";

export function getAllDeviceTypes(req, res, next){
    getAllDeviceTypesDao()
    .then(({rows}) => {
        res.status(200).json(rows);
    })
    .catch(err => res.status(502).json(err));
}
import { getAllDevicesDao } from "../model/devicesDao.js";

export function getAllDevices(req, res, next){
    getAllDevicesDao()
    .then(({rows}) => {
        res.status(200).json(rows);
    })
    .catch(err => res.status(502).json(err));
}
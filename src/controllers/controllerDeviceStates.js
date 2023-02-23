import { getAllDeviceStatesDao } from "../model/deviceStatesDao.js";

export function getAllDeviceStates(req, res, next){
    getAllDeviceStatesDao()
    .then(({rows}) => {
        res.status(200).json(rows);
    })
    .catch(err => res.status(502).json(err));
}
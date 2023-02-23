import { getAllLotsDao } from "../model/lotsDao.js";

export function getAllLots(req, res, next){
    getAllLotsDao()
    .then((response) => {
        res.status(200).json(response.rows);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
}
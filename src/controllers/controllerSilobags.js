import { getErrorObject } from "../helpers/getErrorObject.js";
import { getSilobagsDao } from "../model/silobagsDao.js";

export async function getSilobags(req, res, next) {
    getSilobagsDao({...req.query, ...req.params})
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(getErrorObject(err))
        })
}
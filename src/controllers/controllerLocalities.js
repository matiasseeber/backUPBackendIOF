import { getAllLocalitiesDao, getLocalitiesByMunicipalityIdDao } from "../model/localitiesDao.js";

export function getLocalityByMunicipalitiesId(req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ err: "Debe ingresar un id..." });
    getLocalitiesByMunicipalityIdDao()
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((err) => res.status(502).json(err));
}

export function getAllLocalities(req, res, next) {
    getAllLocalitiesDao()
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch(err => res.status(502).json(err));
}
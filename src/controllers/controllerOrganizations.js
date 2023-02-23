import { getAllOrganizationsDao, getOrganizationByIdDao } from "../model/organizationsDao.js";

export function getAllOrganizations(req, res, next) {
    getAllOrganizationsDao()
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((err) => res.status(400).json(err))
}

export function getOrganizationById(req, res, next) {
    getOrganizationByIdDao({ ...req.params })
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
}
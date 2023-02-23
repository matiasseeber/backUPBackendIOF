import { getAllDeviceNetTypesDao } from "../model/devicesNetTypes.js";

export function getAllDeviceNetTypes(req, res) {
    getAllDeviceNetTypesDao()
        .then(({ rows }) => {
            res.status(200).json(rows);
        })
        .catch((err) => res.status(400).json(err));
}
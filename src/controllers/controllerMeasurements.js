import { getMeasurementsByEUIDao } from "../model/measurmentsDao.js";

export function getMeasurementsByEUI(req, res, next) {
    const eui = req.params.eui;
    if (!eui) return res.status(400).json({ err: "Debe ingresar un id..." });
    getMeasurementsByEUIDao(eui)
        .then((response) => {
            res.status(200).json(response.rows);
        })
        .catch((err) => {
            res.status(502).json(err);
        })
}
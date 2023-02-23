import { connection } from "./config.js";

export function getMeasurementsByEUIDao(eui) {
    return connection(async (client) => {
        return client.query(`Select * from measurements where eui_id = '${eui}';`)
    });
}
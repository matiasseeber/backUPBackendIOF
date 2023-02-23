import { connection } from "./config.js";

export function getLocalitiesByMunicipalityIdDao(id) {
    return connection(async (client) => {
        return client.query(`Select * from localities where municipality_id = ${id} order by name asc;`)
    });
}

export function getAllLocalitiesDao() {
    return connection(async (client) => {
        return client.query(`Select * from localities order by name asc;`)
    });
}
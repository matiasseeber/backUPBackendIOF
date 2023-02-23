import { connection } from "./config.js";

export function getAllPermissionsDao() {
    return connection(async (client) => {
        return client.query('Select * from permissions order by id asc;')
    });
}
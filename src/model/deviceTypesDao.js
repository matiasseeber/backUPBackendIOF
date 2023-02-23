import { connection } from "./config.js";

export function getAllDeviceTypesDao() {
    return connection((client) => {
        return client.query(`Select * from device_types`)
    });
}

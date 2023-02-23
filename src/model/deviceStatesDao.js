import { connection } from "./config.js";

export function getAllDeviceStatesDao() {
    return connection((client) => {
        return client.query(`Select * from device_statuses`)
    });
}

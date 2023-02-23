import { connection } from "./config.js";

export function getAllDeviceNetTypesDao(){
    const query = `Select * from device_net_types;`;
    return connection((client) => {
        return client.query(query);
    })
}
import { connection } from "./config.js";

export function getAllDevicesDao(){
    const query = `Select devices.*, device_statuses.name as device_statuses_name, device_types.name as device_types_name,
    device_net_types.name as device_net_types_name, organizations.name as organizations_name
    from devices inner join device_statuses
    on devices.device_status_id = device_statuses.id 
    inner join device_types on device_type_id = device_types.id
    inner join device_net_types on device_type_id = device_net_types.id
    inner join organizations on organization_id = organizations.id;`;
    return connection((client) => {
        return client.query(query);
    })
}
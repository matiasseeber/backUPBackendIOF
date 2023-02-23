import { connection } from "./config.js";

export function getSilobagsDao({ id, organization_id, lot_id, silobag_product_type_id, silobag_species_type_id, silobag_harvest_id }) {
    let query = `Select silobags.id, silobags.name, silobags.confection_date, 
    silobags.size, main_lat, main_lon, main_point, init_lat, init_lon, init_point, init_image, end_lat, end_lon, end_point, end_image,
    initial_humidity, calculated_weight, input_weight, extracted_all, silobag_harvest_id, silobag_product_type_id, silobag_species_type_id, observations, silobag_product_type_id, silobag_species_type_id, silobag_harvest_id, silobag_data_status_id, silobags.main_image, 
    organizations.id as organization_id, organizations.name as organization_name, organizations.legal_name,
    organizations.tax_id, organizations.address, organizations.phone, organizations.email, 
    organizations.blockchain_enabled, organizations.prosegur_monitoring, 
    organizations.active as is_organization_active,
    organizations.created_at as organization_creation_date, 
    organizations.created_at as organization_updated_date, 
    lots.id as lot_id, lots.name as lot_name, lots.geom, lots.country_L2_id, lots.countryside_id, 
    lots.active as is_lot_active,
	silobag_species_types as silobags_species_types_name,
	silobag_harvests.name as silobag_harvests_name,
	silobag_product_types.name as silobag_product_types_name
    from silobags
    inner join organizations on organizations.id = silobags.organization_id
	inner join silobag_product_types on silobag_product_types.id = silobag_product_type_id
	inner join silobag_harvests on silobag_harvests.id = silobag_harvest_id
	inner join silobag_species_types on silobag_species_type_id = silobag_species_types.id
    left join lots on silobags.lot_id = lots.id where silobags.active = true and silobags.extracted_all = false`;
    if (organization_id) query += ` and organization_id = ${organization_id}`;
    if (lot_id) query += ` and lot_id = ${lot_id}`;
    if (silobag_product_type_id) query += ` and silobag_product_type_id = ${silobag_product_type_id}`;
    if (silobag_species_type_id) query += ` and silobag_species_type_id = ${silobag_species_type_id}`;
    if (silobag_harvest_id) query += ` and silobag_harvest_id = ${silobag_harvest_id}`;
    if (id) query += ` and silobags.id = ${id}`;
    let silobags = [];
    return connection((client) => {
        return client.query(query);
    })
        .then((response) => {
            silobags = response.rows;
            if (silobags.length == 0) return silobags;

            query = "Select * from silobags_devices left join devices on silobags_devices.device_id = devices.id";
            for (let i = 0; i < silobags.length; i++) {
                const { id } = silobags[i];
                if (i == 0)
                    query += ` where silobag_id = ${id}`;
                else
                    query += ` or silobag_id = ${id}`;
            }
            return connection((client) => {
                return client.query(query);
            })
        })
        .then((silobag_devices) => {
            silobag_devices = silobag_devices.rows;
            if (silobag_devices.length == 0) return silobags;
            silobags.forEach(silobag => {
                silobag.silobag_devices = silobag_devices.filter(({ silobag_id }) => silobag_id == silobag.id);
            });
            return silobags.sort((a, b) => a.id - b.id);
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
}
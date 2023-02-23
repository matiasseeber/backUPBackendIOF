import { connection } from "./config.js";

export function getAllOrganizationsDao() {
    return connection(async (client) => {
        return client.query('Select * from organizations order by id asc;')
    })
}

export async function getOrganizationByIdDao({ id }) {
    let organization = null;
    return connection(async (client) => {
        return client.query(`Select * from organizations where id = ${id} order by id asc;`)
    })
        .then(({ rows }) => {
            if (rows.lenght == 0 || !rows) return rows;
            organization = rows[0];
            return Promise.all([
                connection(async (client) => {
                    return client.query(`Select * from companies where organization_id = ${organization.id}`);
                }),
                connection(async (client) => {
                    return client.query(`Select * from users inner join roles on roles.id = users.role_id where organization_id = ${organization.id}`);
                }),
                connection(async (client) => {
                    return client.query(`Select * from devices where organization_id = ${organization.id}`);
                })
            ])
        })
        .then((response) => {
            let queries = [];
            organization.companies = response[0].rows;
            organization.users = response[1].rows;
            organization.devices = response[2].rows;
            const { companies, users } = organization;
            if (companies && companies.length > 0) {
                let query = `Select * from countrysides where `;
                companies.forEach((company, index) => {
                    query += index == 0 ? ` company_id = ${company.id}` : `or company_id = ${company.id}`;
                });
                queries.push(connection(async (client) => {
                    return client.query(query);
                }));
            }
            if (users && users.length > 0) {
                let userPermissionsQuery = "Select user_permissions.*, name from user_permissions inner join permissions on user_permissions.permission_id = permissions.id where ";
                users.forEach(({ id }, index) => {
                    userPermissionsQuery += index == 0 ? `user_id = ${id}` : ` or user_id = ${id}`;
                })
                queries.push(connection(async (client) => {
                    return client.query(userPermissionsQuery);
                }));
            }
            return Promise.all(queries);
        })
        .then((response) => {
            const countrySidesResponse = response[0];
            const userPermissionsResponse = response[1];
            const countrySidesRows = countrySidesResponse.rows;
            const userPermissionsRows = userPermissionsResponse.rows;
            if (userPermissionsRows.length != 0) {
                organization.users.forEach((user) => {
                    user.userPermissions = userPermissionsRows.filter(({ user_id }) => user_id == user.id)
                });
            }
            if (countrySidesRows.lenght != 0) {
                organization.companies.forEach((company) => {
                    company.countrysides = countrySidesRows.filter(({ id }) => id == company.id)
                });
                let query = "Select * from lots where"
                countrySidesRows.forEach(({ id }, index) => {
                    query += index == 0 ? ` countryside_id = ${id}` : ` or countryside_id = ${id}`;
                });
                return connection(async (client) => {
                    return client.query(query);
                });
            }
            return organization;
        })
        .then(({ rows }) => {
            if (rows.length == 0) return organization;
            const { companies } = organization;
            companies.forEach((company) => {
                const { countrysides } = company;
                countrysides.forEach((countryside) => {
                    countryside.lots = rows.filter(({countryside_id}) => countryside_id == countryside.id);
                })
            })
            return organization;
        })
}
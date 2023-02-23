import { connection } from "./config.js";

export function getAllRolesDao() {
    const query = `Select * from roles`;
    let roles = [];
    return connection((client) => {
        return client.query(query);
    })
        .then(({ rows }) => {
            if (rows.length == 0) return [];
            roles = rows;
            let query = "Select * from role_permissions where";
            rows.forEach(({ id }, index) => {
                query += index == 0 ? ` role_id = ${id}` : ` or role_id = ${id}`;
            });
            return Promise.all([
                connection((client) => {
                    return client.query("select * from permissions;");
                }),
                connection((client) => {
                    return client.query(query);
                })
            ])
        })
        .then((response) => {
            roles.forEach((role) => {
                const roleId = role.id;
                role.permissions = response[0].rows || [];
                role.permissions.forEach((permission) => {
                    const { id } = permission;
                    permission.role_permissions = response[1].rows.filter(({ role_id, permission_id }) => {
                        return role_id == roleId && permission_id == id;
                    });
                });
            });
            return roles;
        })
}
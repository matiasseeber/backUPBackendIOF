import { connection } from "./config.js";

export function getAllUsersDao() {
    let users = [];
    return connection(async (client) => {
        return client.query(`Select users.*, roles.name, roles.active as isRoleActive,
        organizations.legal_name, tax_id, address, organizations.phone as organizationPhone, organizations.email as organizationEmail, blockchain_enabled, prosegur_monitoring, organizations.active as isOrganizationActive 
        from users inner join roles on users.role_id = roles.id inner join organizations
        on organizations.id = users.organization_id;`)
    })
        .then((response) => {
            if(response.row == 0) return [];
            users = response.rows;
            let query = `Select id, permission_id, user_permissions.user_id ,max_date
            from user_permissions
            inner join 
            (SELECT user_id,MAX(created_at) as max_date FROM user_permissions`
            users.forEach((user, index) => {
                const {id} = user;
                query += index == 0 ? ` where user_id = ${id}` : ` or user_id = ${id}`;
            });
            query += ` GROUP BY user_id)a
            on a.user_id = user_permissions.user_id and a.max_date = user_permissions.created_at`;
            return connection(async (client) => {
                return client.query(query)
            });
        })
        .then((user_permissions) => {
            user_permissions = user_permissions.rows;
            users.forEach((item) => {
                const {id} = item;
                item.user_permissions = user_permissions.filter((item) => item.user_id == id);
            });
            return users;
        })
        .catch((err) => err);
}
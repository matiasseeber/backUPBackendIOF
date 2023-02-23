import { connection } from "./config.js";

export function getAllLotsDao(){
    const query = `Select * from lots`;
    return connection((client) => {
        return client.query(query);
    });
}
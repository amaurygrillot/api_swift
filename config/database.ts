import {Connection, createConnection} from 'mysql2/promise';

export class DatabaseUtils {

    private static _connection?: Connection;

    public static async getConnection(): Promise<Connection> {
        if(!DatabaseUtils._connection) {
            DatabaseUtils._connection = await createConnection({
                host: `${process.env.host}`,
                user: `${process.env.user}`,
                password: `${process.env.password}`,
                database: `${process.env.database}`,
                port: 3306
            });
        }
        return DatabaseUtils._connection;
    }
}

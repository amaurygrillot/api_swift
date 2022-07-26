import { Connection, RowDataPacket } from "mysql2/promise";
import { DatabaseUtils} from "../config/database";
import { User} from "../models/user.model";

export class UserRepository{
    private table: string = "user";
    private static _connection: Connection | null;
    private static _instance: UserRepository;

    public static async getInstance(): Promise<UserRepository> {
        if(UserRepository._instance === undefined) {
            UserRepository._instance = new UserRepository();
        }
        return UserRepository._instance;
    }
    
    public async getAll(): Promise<User[] | null>{
        UserRepository._connection = await DatabaseUtils.getConnection();
        try {  
            if(UserRepository._connection){
            const res = await UserRepository._connection.query(`SELECT * FROM ${this.table}`);
            if(res[0] === undefined || res[0] === [])
            {
                return null;
            }
            const data = res[0];

                if(Array.isArray(data)) {
                    return (data as RowDataPacket[]).map(function(row) {
                        return new User({
                            id: "" + row["id"],
                            mail: row["mail"],
                            login: row["login"],
                            password: row["password"],
                            updateAt: row["updateAt"],
                            createdAt: row["createdAt"]
                        });
                    });
                }
            }
        } catch(err) {
            console.error(err); 
        }
        return null;
    }

    public async getOne(login?: string, mail?: string, id?: string): Promise<User | null> {
        UserRepository._connection = await DatabaseUtils.getConnection();
        try{
            if(UserRepository._connection){
                const res = await UserRepository._connection.query(`SELECT * FROM ${this.table}
                WHERE login = "${login}" OR mail = "${mail}" OR id = "${id}"`);
                const data = res[0];
                if(Array.isArray(data)) {
                    const rows = data as RowDataPacket[];
                    if(rows.length > 0) {
                        const row = rows[0];
                        if(row === undefined)
                        {
                            return null;
                        }
                        return new User({
                            id: "" + row["id"],
                            mail: row["mail"],
                            login: row["login"],
                            password: row["password"],
                            updateAt: row["updateAt"],
                            createdAt: row["createdAt"]
                        });
                    }
                }
            }
        } catch(err) {
            console.error(err); 
        }
       
        return null;
    }

    public async insert(user: User): Promise<User | null> {
        UserRepository._connection = await DatabaseUtils.getConnection();
        try {
            if(UserRepository._connection){
                await UserRepository._connection.execute(`INSERT INTO ${this.table} 
                    (id, mail, login, password, updateAt, createdAt) 
                    VALUES (?, ?, ?, ?, ?, ?)`, [
                    user.id,
                    user.mail,
                    user.login,
                    user.password,
                    user.updateAt,
                    user.createdAt
                ]);
                return user;
            }
        } catch(err) {
            console.error(err); 
        }
        return null;
    }

    public async update(id: string, user: User): Promise<User | null> {
        UserRepository._connection = await DatabaseUtils.getConnection();
        try {
            if(UserRepository._connection){
                user.updateAt = new Date();
                await UserRepository._connection.execute(`UPDATE ${this.table} 
                SET mail=?, login=?, password=?, updateAt=?   
                WHERE id = "${id}"`, [
                    user.mail,
                    user.login,
                    user.password,
                    user.updateAt
                ]);
                return new User(user);
            }
        } catch(err) {
            console.error(err); 
        }
        return null;
    }

    public async delete(id: string): Promise<string | null> {
        UserRepository._connection = await DatabaseUtils.getConnection();
        try {
            if(UserRepository._connection){
                await UserRepository._connection.query(`DELETE FROM ${this.table} WHERE id = "${id}"`);        
                return id;
            }
        } catch(err) {
            console.error(err); 
        }
        return null;
    }
}

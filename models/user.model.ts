export interface IUser {
    id?: string;
    mail: string;
    login: string;
    password: string;
    updateAt?: Date;
    createdAt?: Date;
}

export class User implements IUser {
    id?: string;
    mail: string;
    login: string;
    password: string;
    updateAt?: Date;
    createdAt?: Date;

    constructor(user: User) {
        this.id = user.id;
        this.mail = user.mail;
        this.login = user.login;
        this.password = user.password;
        this.updateAt = user.updateAt;
        this.createdAt = user.createdAt;
    }
}

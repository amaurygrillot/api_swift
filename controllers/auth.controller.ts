import { UserService} from "../services/user.service";
import { User} from "../models/user.model";
import { AuthService} from "../services/auth.service";
import {Session} from "../models/session.model";


export class AuthController {

    private authService: AuthService;
    private userService: UserService;


    constructor(){
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    public async ClientSubscribe(user: User): Promise<User | null> {
        return this.userService.createUser(user);
    }

    public async login(login: string, password: string): Promise<Session | null> {
        let session = await this.authService.getUser(login, password);
        if(session != undefined) {
            return session;
        }
        return null;
    }

    public async logout(token: string): Promise<string | null> {
       return this.userService.deleteSession(token);
    }

    public async getSessionByToken(token: string): Promise<Session | null> {
        return this.authService.getSessionByToken(token);

    }
}

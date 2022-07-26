import { UserRepository} from "../repositories/user.repository";
import { Session} from "../models/session.model";
import { SessionRepository} from "../repositories/session.repository";

const bcrypt = require("bcrypt");
const crypto = require("crypto")
export class AuthService {

    private userRepository: UserRepository;
    private sessionRepository: SessionRepository;
    private saltRounds: number = 15;

    constructor(){
        this.userRepository = new UserRepository();
        this.sessionRepository = new SessionRepository();
    }

    private async getAllInstance(): Promise<void>{
        this.userRepository = await UserRepository.getInstance();
    }

    public async getUser(login: string, password: string): Promise<Session | null>{
        this.getAllInstance();
        const user = await this.userRepository.getOne(login);
        if(user === null) {
            try {
                throw new Error('Utilisateur non trouvé.');
            }
            catch(e) {
                console.log(e);
            }
        }
        if(user != undefined) {
            const isSamePassword = bcrypt.compare(bcrypt.hashSync(password,this.saltRounds), user.password);
            if(!isSamePassword) {
                try {
                    throw new Error('Mot de passe incorrect.');
                }
                catch(e) {
                    return null;
                }
            }
        }

        let token = crypto.randomBytes(20).toString('hex');
        if(user != undefined){
            return this.sessionRepository.insert({token : token, userId: user.id});
        }
        return null;
    }

    public async deleteSession(token: string): Promise<string | null> {
        this.sessionRepository = await SessionRepository.getInstance();

        const session = await this.sessionRepository.getOne(token);
        if(session === null) {
            try {
                throw new Error('Vous n\'êtes pas connecté.');
            }
            catch(e) {
                console.log(e);
            }
        }
        return this.sessionRepository.delete(token);
    }

    public async getSessionByToken(token: string): Promise<Session | null> {
        const session = await this.sessionRepository.getOne(token);
        return session;
    }
}

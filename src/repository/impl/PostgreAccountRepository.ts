import Usuario from "../../domain/Usuario";
import AccountRepository from "../AccountRepository";
import pgp from "pg-promise";


export default class PostgreAccountRepository implements AccountRepository {

    connection: any

    constructor() {
        this.init()
    }

    async init() {
        console.log("Iniciando conexao com banco....")
        this.connection = await pgp()("postgres://postgres:123456@localhost:5432/app");
        console.log("Conexao com banco iniciada....")
    }

    async close(): Promise<void> {
        await this.connection.$pool.end()
        console.log("Conexao com banco fechada....")
    }

    async create(usuario: Usuario): Promise<string> {
        const id = crypto.randomUUID();
        return await this.connection.query("insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
            [id, usuario.getName(), usuario.getEmail(), usuario.getCpf(), usuario.getCarPlate, !!usuario.isPassenger(), !!usuario.isPassenger()]);
    }

    async findByEmail(email: string): Promise<Usuario | undefined> {
        return await this.connection.query("select * from cccat16.account where email = $1", [email])
    }

}
import Usuario from "../domain/Usuario";
import AccountRepository from "../repository/AccountRepository";
import SignupDTO from "./dto/SignupDTO";

export default class SignupService {

    repository: AccountRepository

    constructor(readonly accountRepository: AccountRepository) {
        this.repository = accountRepository
    }

    async create(dto: SignupDTO): Promise<string> {

        const exists = await this.repository.findByEmail(dto.email)

        if (exists) throw Error("-4")

        const usuario = new Usuario(dto.name, dto.email, dto.cpf, dto.isPassenger, dto.isDriver, dto.carPlate)

        const id: string = await this.repository.create(usuario)

        await this.repository.close()

        return id
    }
}
import Usuario from "../domain/Usuario";

export default interface AccountRepository{

    create(usuario: Usuario): Promise<string>;

    findByEmail(email: string): Promise<Usuario | undefined>;

    close(): void

}
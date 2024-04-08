export default class SignupDTO {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly cpf: string,
        readonly isPassenger: boolean,
        readonly isDriver: boolean,
        readonly carPlate? : string
    ) { }
}
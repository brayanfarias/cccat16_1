import { validate } from "../validateCpf"

export default class Usuario {
    private name: string
    private email: string
    private cpf: string
    private passenger: boolean = false
    private driver: boolean = false
    private carPlate?: string 

    constructor(
        name: string,
        email: string,
        cpf: string,
        isPassenger: boolean,
        isDriver: boolean,
        carPlate?: string
    ) {

        this.name = this.isNameValid(name)
        this.email = this.isEmailValid(email)
        this.cpf = this.isCpfValid(cpf)
        this.passenger = isPassenger
        this.driver = isDriver
        this.carPlate = this.isCarPlateValid(carPlate)
    }

    getEmail(){
        return this.email
    }

    getName(){
        return this.name
    }

    getCpf(){
        return this.cpf
    }

    getCarPlate(){
        return this.carPlate
    }
    
    isCarPlateValid(carPlate?: string): string | undefined {

        if (!carPlate) return undefined

        if (carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
            return carPlate
        } else {
            throw Error("-5")
        }

    }

    isNameValid(name: string): string {
        if (name.match(/[a-zA-Z] [a-zA-Z]+/)) {
            return name
        } else {
            //TODO checar custom exception
            throw Error("-3")

        }

    }

    isEmailValid(email: string) {

        if (email.match(/^(.+)@(.+)$/)) {
            return email
        } else {
            //TODO checar custom exception
            throw Error("-2")
        }
    }

    isCpfValid(cpf: string): string {
        if (validate(cpf)) {
            return cpf
        } else {
            //TODO checar custom exception
            throw Error("-1")
        }

    }

    isDriver(): boolean {
        return this.driver === true
    }

    isPassenger(): boolean {
        return this.passenger == true
    }


}
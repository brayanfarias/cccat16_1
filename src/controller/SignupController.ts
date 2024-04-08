import { Request, Response } from "express";
import SignupService from "../service/SignupService";
import SignupDTO from "../service/dto/SignupDTO";

export default class SignupController {

    constructor(readonly signupService: SignupService) {
        this.signupService = signupService
     }

    async execute(request: Request, response: Response): Promise<Response> {

        const dto = new SignupDTO(
            request.body.name,
            request.body.email,
            request.body.cpf,
            request.body.isPassenger,
            request.body.isDriver
        )

        try {
            const id = await this.signupService.create(dto)
            return response.json({ accountId: id })

        } catch (error: any) {
            return response.status(422).send(error.message)
        }

    }

}
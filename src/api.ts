import express from "express";
import SignupController from "./controller/SignupController";
import PostgreAccountRepository from "./repository/impl/PostgreAccountRepository";
import SignupService from "./service/SignupService";
const app = express();
app.use(express.json());

const accountRepository = new PostgreAccountRepository();
const signupService = new SignupService(accountRepository);
const signupController = new SignupController(signupService);

app.post("/signup", (request, response) =>
  signupController.execute(request, response)
);

const server = app.listen(3000, () => console.log("App running at 3000"));

module.exports = server;

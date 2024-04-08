import axios from "axios";
const server = require('../src/api');

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(200)
	expect(output.data.accountId).not.toBe(undefined || null)
});

test("NAO deve criar conta para passageiro porque ela já existe", async function () {
	const email = `john.doe${Math.random()}@gmail.com`

	const input = {
		name: "John Doe",
		email: email,
		cpf: "87748248800",
		isPassenger: true
	};
	await axios.post("http://localhost:3000/signup", input);
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(422)
	expect(output.data).toBe(-4);
})

test("NAO deve criar conta para passageiro porque NOME invalido", async function () {
	const input = {
		name: "123",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(422)
	expect(output.data).toBe(-3);
})

test("NAO deve criar conta para passageiro porque CPF invalido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "sou inválido",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(422)
	expect(output.data).toBe(-1);
})

test("NAO deve criar conta para passageiro porque EMAIL invalido", async function () {
	const input = {
		name: "John Doe",
		email: `sou invalido`,
		cpf: "87748248800",
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(422)
	expect(output.data).toBe(-2);
})

test("Deve criar uma conta para o motorista", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "ABC1234"
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(200)
	expect(output.data.accountId).not.toBe(undefined || null)
});
test("Deve criar uma conta para o motorista", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isDriver: true,
		carPlate: "invalido"
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(422)
	expect(output.data).toBe(-5)
});

afterAll(async () => await server.close())
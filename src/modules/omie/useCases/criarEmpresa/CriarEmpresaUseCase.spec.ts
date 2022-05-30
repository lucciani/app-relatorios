import { EmpresaRepositoryInMemory } from "@modules/omie/repositories/in-memory/EmpresaRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { onlyNumbers } from "@utils/regex";

import { CriarEmpresaUseCase } from "./CriarEmpresaUseCase";

let createCompanyUsecase: CriarEmpresaUseCase;
let companiesRepositoryInMemory: EmpresaRepositoryInMemory;
describe("Create company", () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new EmpresaRepositoryInMemory();
    createCompanyUsecase = new CriarEmpresaUseCase(companiesRepositoryInMemory);
  });

  it("deve ser capaz de criar uma nova empresa com cnpj válido", async () => {
    const empresa = {
      razaoSocial: "Razao social teste",
      nomeFantasia: "Nome fantasia teste",
      cnpj: "70.134.430/0001-81",
      ie: "123456",
      appKey: "123569",
      appSecret: "987321",
    };
    const treatedCnpj = onlyNumbers(empresa.cnpj);

    const empresaAtual = await createCompanyUsecase.execute({
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      cnpj: treatedCnpj,
      ie: empresa.ie,
      appKey: empresa.appKey,
      appSecret: empresa.appSecret,
    });

    expect(empresaAtual).toHaveProperty("id");
  });

  it("não deve ser possível criar uma nova empresa com cnpj existe", async () => {
    expect(async () => {
      const company = {
        razaoSocial: "Razao social teste 2",
        nomeFantasia: "Nome fantasia teste 2",
        cnpj: "82.887.203/0001-06",
        ie: "123456",
        appKey: "123569",
        appSecret: "987321",
        // id: Math.floor(Math.random() * 10),
      };

      await createCompanyUsecase.execute({
        razaoSocial: company.razaoSocial,
        nomeFantasia: company.nomeFantasia,
        cnpj: company.cnpj,
        ie: company.ie,
        appKey: company.appKey,
        appSecret: company.appSecret,
        // id: company.id,
      });

      await createCompanyUsecase.execute({
        razaoSocial: company.razaoSocial,
        nomeFantasia: company.nomeFantasia,
        cnpj: company.cnpj,
        ie: company.ie,
        appKey: company.appKey,
        appSecret: company.appSecret,
        // id: company.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new company with invalid cnpj", async () => {
    expect(async () => {
      const company = {
        razaoSocial: "Razao social teste 2",
        nomeFantasia: "Nome fantasia teste 2",
        cnpj: "82.887.203/0001-00",
        ie: "123456",
        appKey: "123569",
        appSecret: "987321",
        id: Math.floor(Math.random() * 10),
      };

      await createCompanyUsecase.execute({
        razaoSocial: company.razaoSocial,
        nomeFantasia: company.nomeFantasia,
        cnpj: company.cnpj,
        ie: company.ie,
        appKey: company.appKey,
        appSecret: company.appSecret,
        id: company.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

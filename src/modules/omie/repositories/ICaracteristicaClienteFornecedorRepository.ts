import { ICaracteristicaClienteFornecedorDTO } from "../dtos/ICaracteristicaClienteFornecedorDTO";
import { CaracteristicaClienteFornecedor } from "../infra/typeorm/entities/CaracteristicaClienteFornecedor";

interface ICaracteristicaClienteFornecedorRepository {
  create(
    tags: ICaracteristicaClienteFornecedorDTO
  ): Promise<CaracteristicaClienteFornecedor>;
  findByEmpresaIdAndCodigoClienteAndCampo(
    tags: ICaracteristicaClienteFornecedorDTO
  ): Promise<CaracteristicaClienteFornecedor>;
}

export { ICaracteristicaClienteFornecedorRepository };

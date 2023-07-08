import { AddEmployeeRequest, EmployeeResponse } from "@/dtos/employee.dto";
import { Employee } from "@/entities/employee.entity";

export class EmployeeMapper {
  transformAddRequestIntoEntity(dto: AddEmployeeRequest): Employee {
    return {
      _id: undefined,
      detail: dto.detail,
      contactAndAddress: dto.contactAndAddress,
      family: dto.family,
      leave: dto.leave,
      deletedAt: null
    };
  }
  
  transformEntityToResponse(entity: Employee): EmployeeResponse {
    return {
      id: entity._id,
      detail: entity.detail,
      contactAndAddress: entity.contactAndAddress,
      family: entity.family,
      leave: entity.leave
    };
  }
}
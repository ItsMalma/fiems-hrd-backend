import {
  AddEmployeeRequest,
  EmployeeResponse,
  EmployeeShortResponse,
  GetAllEmployeesRequest
} from "@/dtos/employee.dto";
import { Employee } from "@/entities/employee.entity";
import { Sort } from "mongodb";
import moment from "moment";

export class EmployeeMapper {
  transformAddRequestIntoEntity(dto: AddEmployeeRequest): Employee {
    dto.detail.joining = moment(dto.detail.joining, "DD/MM/YYYY", true).toDate();
    dto.detail.end = dto.detail.end && moment(dto.detail.end, "DD/MM/YYYY", true).toDate();
    dto.detail.dateOfBirth = moment(dto.detail.dateOfBirth, "DD/MM/YYYY", true).toDate();
    
    return {
      _id: undefined,
      detail: dto.detail,
      contactAndAddress: dto.contactAndAddress,
      family: dto.family,
      leave: dto.leave,
      deletedAt: null
    };
  }
  
  transformGetAllRequestIntoSort(dto: GetAllEmployeesRequest): Sort {
    const sort: Sort = {};
    
    switch (dto.sort) {
    case "az":
      sort["detail.name"] = 1;
      break;
    case "za":
      sort["detail.name"] = -1;
      break;
    }
    
    return sort;
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
  
  transformEntityToShortResponse(entity: Employee): EmployeeShortResponse {
    return {
      id: entity._id,
      name: entity.detail.name
    };
  }
  
  transformEntitiesToResponses(entities: Employee[]): EmployeeResponse[] {
    return entities.map(entity => this.transformEntityToResponse(entity));
  }
  
  transformEntitiesToShortResponses(entities: Employee[]): EmployeeShortResponse[] {
    return entities.map(entity => this.transformEntityToShortResponse(entity));
  }
}
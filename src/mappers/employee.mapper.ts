import {
  SaveEmployeeRequest,
  EmployeeResponse,
  EmployeeShortResponse,
  FilterEmployeesRequest
} from "@/dtos/employee.dto";
import { Employee } from "@/entities/employee.entity";
import { Sort } from "mongodb";
import moment from "moment";

export class EmployeeMapper {
  saveRequestToEntity(dto: SaveEmployeeRequest): Employee {
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
  
  filterRequestToSort(dto: FilterEmployeesRequest): Sort {
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
  
  entityToResponse(entity: Employee): EmployeeResponse {
    return {
      id: entity._id,
      detail: entity.detail,
      contactAndAddress: entity.contactAndAddress,
      family: entity.family,
      leave: entity.leave
    };
  }
  
  entityToShortResponse(entity: Employee): EmployeeShortResponse {
    return {
      id: entity._id,
      name: entity.detail.name
    };
  }
  
  entitiesToResponses(entities: Employee[]): EmployeeResponse[] {
    return entities.map(entity => this.entityToResponse(entity));
  }
  
  entitiesToShortResponses(entities: Employee[]): EmployeeShortResponse[] {
    return entities.map(entity => this.entityToShortResponse(entity));
  }
}
import {
  SaveEmployeeRequest,
  EmployeeResponse,
  EmployeeShortResponse,
  FilterEmployeesRequest
} from "@/dtos/employee.dto";
import { Employee } from "@/entities/employee.entity";
import moment from "moment";
import { EmployeeSort } from "@/repositories/employee.repository";

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
  
  filterRequestToSort(dto: FilterEmployeesRequest): EmployeeSort {
    const sort: EmployeeSort = {};
    
    if (dto.sort)
      sort.name = dto.sort === "az" ? "asc" : "desc";
    
    return sort;
  }
  
  entityToResponse(entity: Employee): EmployeeResponse {
    return {
      id: entity._id,
      detail: {
        name: entity.detail.name,
        joining: moment(entity.detail.joining).format("DD/MM/YYYY"),
        end: entity.detail.end && moment(entity.detail.end).format("DD/MM/YYYY"),
        nik: entity.detail.nik,
        npwp: entity.detail.npwp,
        placeOfBirth: entity.detail.placeOfBirth,
        dateOfBirth: moment(entity.detail.dateOfBirth).format("DD/MM/YYYY"),
        gender: entity.detail.gender,
        bloodType: entity.detail.bloodType,
        religion: entity.detail.religion,
        latestEducation: entity.detail.latestEducation,
        yearOfGraduation: entity.detail.yearOfGraduation,
      },
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
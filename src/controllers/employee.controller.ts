import { EmployeeRepository } from "@/repositories/employee.repository";
import { Request, Response, Router } from "express";
import { plainToInstance } from "class-transformer";
import {
  SaveEmployeeRequest,
  EmployeeIdRequest,
  FilterEmployeesRequest
} from "@/dtos/employee.dto";
import { Payload } from "@/dtos/payload";
import { validate } from "@/libs/validator";
import { EmployeeMapper } from "@/mappers/employee.mapper";

export class EmployeeController {
  private employeeMapper: EmployeeMapper = new EmployeeMapper();
  
  constructor(
    private employeeRepository: EmployeeRepository
  ) {}
  
  private async addEmployee(req: Request, res: Response) {
    const saveEmployeeRequest = plainToInstance<SaveEmployeeRequest, unknown>(
      SaveEmployeeRequest, req.body, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(saveEmployeeRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    const employee = await this.employeeRepository.insert(
      this.employeeMapper.saveRequestToEntity(saveEmployeeRequest)
    );
    
    res.status(201).json(new Payload(this.employeeMapper.entityToResponse(employee), null));
  }
  
  private async getAllEmployees(req: Request, res: Response) {
    const getEmployeesRequest = plainToInstance<FilterEmployeesRequest, unknown>(
      FilterEmployeesRequest, req.query, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(getEmployeesRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    const employees = await this.employeeRepository.findAll(
      this.employeeMapper.filterRequestToSort(getEmployeesRequest)
    );
    
    res.status(200).json(new Payload(
      this.employeeMapper.entitiesToShortResponses(employees),
      null
    ));
  }
  
  private async getEmployeeById(req: Request, res: Response) {
    const employeeIdRequest = plainToInstance<EmployeeIdRequest, unknown>(
      EmployeeIdRequest, req.params, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(employeeIdRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    const employee = await this.employeeRepository.findById(employeeIdRequest.id);
    if (!employee) {
      return res.status(404).json(new Payload(
        null,
        `employee with id ${employeeIdRequest.id} is not exists`
      ));
    }
    
    res.status(200).json(new Payload(
      this.employeeMapper.entityToResponse(employee), null
    ));
  }
  
  private async editEmployeeById(req: Request, res: Response) {
    const employeeIdRequest = plainToInstance<EmployeeIdRequest, unknown>(
      EmployeeIdRequest, req.params, {excludeExtraneousValues: true}
    );
    
    const saveEmployeeRequest = plainToInstance<SaveEmployeeRequest, unknown>(
      SaveEmployeeRequest, req.body, {excludeExtraneousValues: true}
    );
    
    let errors = await validate(employeeIdRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    errors = await validate(saveEmployeeRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    if (!await this.employeeRepository.findById(employeeIdRequest.id)) {
      return res.status(404).json(new Payload(
        null,
        `employee with id ${employeeIdRequest.id} is not exists`
      ));
    }
    
    const employee = await this.employeeRepository.update(
      employeeIdRequest.id,
      this.employeeMapper.saveRequestToEntity(saveEmployeeRequest)
    );
    
    res.status(200).json(new Payload(
      this.employeeMapper.entityToResponse(employee), null
    ));
  }
  
  public async deleteEmployeById(req: Request, res: Response) {
    const employeeIdRequest = plainToInstance<EmployeeIdRequest, unknown>(
      EmployeeIdRequest, req.params, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(employeeIdRequest);
    if (errors) {
      return res.status(400).json(new Payload(null, errors.toError()));
    }
    
    const employee = await this.employeeRepository.deleteById(employeeIdRequest.id);
    if (!employee) {
      return res.status(404).json(new Payload(
        null,
        `employee with id ${employeeIdRequest.id} is not exists`
      ));
    }
    
    res.status(200).json(new Payload(
      this.employeeMapper.entityToResponse(employee), null
    ));
  }
  
  public getRouter(): Router {
    const router = Router();
    router.post("", this.addEmployee.bind(this));
    router.get("", this.getAllEmployees.bind(this));
    router.get("/:id", this.getEmployeeById.bind(this));
    router.put("/:id", this.editEmployeeById.bind(this));
    router.delete("/:id", this.deleteEmployeById.bind(this));
    
    return router;
  }
}
import { AttendanceMapper } from "@/mappers/attendance.mapper";
import { AttendanceRepository } from "@/repositories/attendance.repository";
import { AttendanceIdRequest, FilterAttendancesRequest, SaveAttendanceRequest } from "@/dtos/attendance.dto";
import { EmployeeRepository } from "@/repositories/employee.repository";
import { Payload } from "@/dtos/payload";
import { validate } from "@/libs/validator";
import { Request, Response, Router } from "express";
import { plainToInstance } from "class-transformer";

export class AttendanceController {
  private attendanceMapper: AttendanceMapper = new AttendanceMapper();
  
  constructor(
    private attendanceRepository: AttendanceRepository,
    private employeeRepository: EmployeeRepository,
  ) {}
  
  private async addAttendance(req: Request, res: Response) {
    const saveAttendanceRequest = plainToInstance<SaveAttendanceRequest, unknown>(
      SaveAttendanceRequest, req.body, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(saveAttendanceRequest);
    if (errors)
      return res.status(400).json(new Payload(null, errors.toError()));
    
    const employee = await this.employeeRepository.findById(saveAttendanceRequest.employeeId);
    if (!employee)
      return res.status(404).json(new Payload(
        null,
        `employee with id ${saveAttendanceRequest.employeeId} is not exists`
      ));
    
    const attendance = await this.attendanceRepository.insert(
      this.attendanceMapper.saveRequestToEntity(saveAttendanceRequest, employee)
    );
    
    res.status(201).json(new Payload(null, this.attendanceMapper.entityToResponse(attendance)));
  }
  
  private async getAllAttendances(req: Request, res: Response) {
    const filterAttendancesRequest = plainToInstance<FilterAttendancesRequest, unknown>(
      FilterAttendancesRequest, req.query, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(filterAttendancesRequest);
    if (errors)
      return res.status(400).json(new Payload(null, errors.toError()));
    
    const query = this.attendanceMapper.filterRequestToQuery(filterAttendancesRequest);
    const attendances = await this.attendanceRepository.findAll(
      query.date, query.filter, query.skip, query.limit, query.sort
    );
    
    res.status(200).json(new Payload(null, this.attendanceMapper.entitiesToResponses(attendances)));
  }
  
  private async editAtttendanceById(req: Request, res: Response) {
    const attendanceIdRequest = plainToInstance<AttendanceIdRequest, unknown>(
      AttendanceIdRequest, req.params, {excludeExtraneousValues: true}
    );
    
    const saveAttendanceRequest = plainToInstance<SaveAttendanceRequest, unknown>(
      SaveAttendanceRequest, req.body, {excludeExtraneousValues: true}
    );
    
    let errors = await validate(attendanceIdRequest);
    if (errors)
      return res.status(400).json(new Payload(null, errors.toError()));
    
    errors = await validate(saveAttendanceRequest);
    if (errors)
      return res.status(400).json(new Payload(null, errors.toError()));
    
    if (!await this.attendanceRepository.findById(attendanceIdRequest.id))
      return res.status(404).json(new Payload(
        null,
        `attendance with id ${attendanceIdRequest.id} is not exists`
      ));
    
    const employee = await this.employeeRepository.findById(saveAttendanceRequest.employeeId);
    if (!employee)
      return res.status(404).json(new Payload(
        null,
        `employee with id ${saveAttendanceRequest.employeeId} is not exists`
      ));
    
    const attendance = await this.attendanceRepository.updateById(
      attendanceIdRequest.id,
      this.attendanceMapper.saveRequestToEntity(saveAttendanceRequest, employee)
    );
    
    res.status(200).json(new Payload(null, this.attendanceMapper.entityToResponse(attendance)));
  }
  
  private async deleteAttendanceById(req: Request, res: Response) {
    const attendanceIdRequest = plainToInstance<AttendanceIdRequest, unknown>(
      AttendanceIdRequest, req.params, {excludeExtraneousValues: true}
    );
    
    const errors = await validate(attendanceIdRequest);
    if (errors)
      return res.status(400).json(new Payload(null, errors.toError()));
    
    const attendance = await this.attendanceRepository.deleteById(attendanceIdRequest.id);
    if (!attendance)
      return res.status(404).json(new Payload(
        null,
        `attendance with id ${attendanceIdRequest.id} is not exists`
      ));
    
    res.status(200).json(new Payload(null, this.attendanceMapper.entityToResponse(attendance)));
  }
  
  public getRouter(): Router {
    const router = Router();
    router.post("", this.addAttendance.bind(this));
    router.get("", this.getAllAttendances.bind(this));
    router.put("/:id", this.editAtttendanceById.bind(this));
    router.delete("/:id", this.deleteAttendanceById.bind(this));
    
    return router;
  }
}
import { AttendanceResponse, FilterAttendancesRequest, SaveAttendanceRequest } from "@/dtos/attendance.dto";
import { Attendance } from "@/entities/attendance.entity";
import { Employee } from "@/entities/employee.entity";
import moment from "moment";
import { AttendanceSort } from "@/repositories/attendance.repository";

export class AttendanceMapper {
  saveRequestToEntity(dto: SaveAttendanceRequest, employee: Employee): Attendance {
    const timeIn = moment(dto.timeIn, "HH:mm", true).toDate();
    const timeOut = moment(dto.timeOut, "HH:mm", true).toDate();
    
    return {
      _id: undefined,
      employee: {
        id: employee._id,
        name: employee.detail.name
      },
      date: moment(dto.date, "DD/MM/YYYY", true).toDate(),
      timeIn: timeIn.getHours()*60 + timeIn.getMinutes(),
      timeOut: timeOut.getHours()*60 + timeOut.getMinutes(),
      deletedtAt: null
    };
  }
  
  filterRequestToQuery(dto: FilterAttendancesRequest): {
    date?: Date, filter?: "ontime" | "late" | "overtime",
    skip?: number, limit?: number,
    sort?: AttendanceSort
  } {
    const sort: AttendanceSort = {};
    const order = dto.order ? dto.order : "asc";
    switch (dto.sort) {
      case "employeeName":
        sort.employeeName = order;
        break;
      case "date":
        sort.date = order;
        break;
      case "timeIn":
        sort.timeIn = order;
        break;
      case "timeOut":
        sort.timeOut = order;
        break;
    }
    
    return {
      date: dto.date && moment(dto.date, "DD/MM/YYYY").toDate(), filter: dto.filter,
      skip: (dto.entries ?? 0) * ((dto.page ?? 1) - 1), limit: dto.entries ?? 0,
      sort
    };
  }
  
  entityToResponse(entity: Attendance): AttendanceResponse {
    return {
      id: entity._id,
      employee: {
        id: entity.employee.id,
        name: entity.employee.name
      },
      date: moment(entity.date).format("DD/MM/YYYY"),
      timeIn: moment.unix(entity.timeIn*60).utc().format("HH:mm"),
      timeOut: moment.unix(entity.timeOut*60).utc().format("HH:mm"),
    };
  }
  
  entitiesToResponses(entities: Attendance[]): AttendanceResponse[] {
    return entities.map(entity => this.entityToResponse(entity));
  }
}
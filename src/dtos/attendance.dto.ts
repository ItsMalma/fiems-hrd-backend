import { Expose, Transform } from "class-transformer";
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString, Min,
} from "class-validator";
import { IsDateFormat } from "@/libs/validator";

export class SaveAttendanceRequest {
  @Expose()
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  employeeId: number;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("DD/MM/YYYY", {message: args => `must be in ${args.constraints[0]} format`})
  date: Date;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("HH:mm", {message: args => `must be in ${args.constraints[0]} format`})
  timeIn: Date;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("HH:mm", {message: args => `must be in ${args.constraints[0]} format`})
  timeOut: Date;
}

export class FilterAttendancesRequest {
  @Expose()
  @IsOptional()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("DD/MM/YYYY", {message: args => `must be in ${args.constraints[0]} format`})
  date: Date;
  
  @Expose()
  @IsOptional()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["ontime", "late", "overtime"],
    {message: arg => {
        const values = arg.constraints[0];
        return "must be " + values
          .slice(0, -1)
          .map(value => `'${value}'`)
          .join(", ") + " or '" + values.at(-1) + "'";
      }}
  )
  filter: "ontime" | "late" | "overtime";
  
  @Expose()
  @Transform(params => params.value && Number(params.value))
  @IsOptional()
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  @Min(1, {message: "must be greater than 1"})
  entries: number;
  
  @Expose()
  @Transform(params => params.value && Number(params.value))
  @IsOptional()
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  @Min(1, {message: "must be greater than 1"})
  page: number;
  
  @Expose()
  @IsOptional()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["employeeName", "date", "timeIn", "timeOut"],
    {message: arg => {
        const values = arg.constraints[0];
        return "must be " + values
          .slice(0, -1)
          .map(value => `'${value}'`)
          .join(", ") + " or '" + values.at(-1) + "'";
      }}
  )
  sort: "employeeName" | "date" | "timeIn" | "timeOut";
  
  @Expose()
  @IsOptional()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["asc", "desc"],
    {message: arg => {
        const values = arg.constraints[0];
        return "must be " + values
          .slice(0, -1)
          .map(value => `'${value}'`)
          .join(", ") + " or '" + values.at(-1) + "'";
      }}
  )
  order: "asc" | "desc";
}

export class AttendanceIdRequest {
  @Expose()
  @Transform(params => Number(params.value))
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  @Min(1, {message: "must be greater than 1"})
  id: number;
}

export class AttendanceResponse {
  id: number;
  employee: {
    id: number;
    name: string;
  };
  date: string;
  timeIn: string;
  timeOut: string;
}


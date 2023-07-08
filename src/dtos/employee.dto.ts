import { Expose, Type } from "class-transformer";
import {
  IsArray,
  IsDefined, IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber, IsNumberString,
  IsObject, IsOptional, IsPhoneNumber, IsPostalCode,
  IsString, ValidateIf,
  ValidateNested
} from "class-validator";
import { IsDateFormat } from "@/libs/validator";

export class AddEmployeeRequestDetail {
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  name: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("DD/MM/YYYY", {message: args => `must be in ${args.constraints[0]} format`})
  joining: Date;
  
  @Expose()
  @IsOptional()
  @IsDateFormat("DD/MM/YYYY", {message: args => `must be in ${args.constraints[0]} format`})
  end: Date;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsNumberString({}, {message: "must be numeric string"})
  nik: string;
  
  @Expose()
  @IsOptional()
  @IsNumberString({}, {message: "must be numeric string"})
  npwp: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  placeOfBirth: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsDateFormat("DD/MM/YYYY", {message: args => `must be in ${args.constraints[0]} format`})
  dateOfBirth: Date;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["Pria", "Wanita"],
    {message: arg => {
      const values = arg.constraints[0];
      return "must be " + values
        .slice(0, -1)
        .map(value => `'${value}'`)
        .join(", ") + " or '" + values.at(-1) + "'";
    }}
  )
  gender: "Pria" | "Wanita";
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["A", "B", "AB", "O"],
    {message: arg => {
      const values = arg.constraints[0];
      return "must be " + values
        .slice(0, -1)
        .map(value => `'${value}'`)
        .join(", ") + " or '" + values.at(-1) + "'";
    }}
  )
  bloodType: "A" | "B" | "AB" | "O";
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["Islam", "Kristen", "Hindu", "Buddha", "Kong Hu Chu", "Lainnya"],
    {message: arg => {
      const values = arg.constraints[0];
      return "must be " + values
        .slice(0, -1)
        .map(value => `'${value}'`)
        .join(", ") + " or '" + values.at(-1) + "'";
    }}
  )
  religion: "Islam" | "Kristen" | "Hindu" | "Buddha" | "Kong Hu Chu" | "Lainnya";
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["SD", "SMP", "SMA/SMK", "Sarjana", "Magister", "Doktor"],
    {message: arg => {
      const values = arg.constraints[0];
      return "must be " + values
        .slice(0, -1)
        .map(value => `'${value}'`)
        .join(", ") + " or '" + values.at(-1) + "'";
    }}
  )
  latestEducation: "SD" | "SMP" | "SMA/SMK" | "Sarjana" | "Magister" | "Doktor";
  
  @Expose()
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  yearOfGraduation: number;
}

export class AddEmployeeRequestEmergencyContact {
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  name: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsPhoneNumber("ID", {message: "must match the format of Indonesia's phone number"})
  phoneNumber: string;
}

export class AddEmployeeRequestContactAndAddress {
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsPhoneNumber("ID", {message: "must match the format of Indonesia's phone number"})
  phoneNumber: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsEmail({}, {message: "must match the e-mail format"})
  email: string;
  
  @Expose()
  @Type()
  @IsDefined({message: "must be defined and not null"})
  @ValidateNested({message: "must be object"})
  emergencyContact: AddEmployeeRequestEmergencyContact;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  address: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  kelurahan: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  kecamatan: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  city: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  province: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsPostalCode("ID", {message: "must match the format of Indonesia's postal code"})
  zipCode: string;
}

export class AddEmployeeRequestFamilyContact {
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  name: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsPhoneNumber("ID", {message: "must match the format of Indonesia's phone number"})
  phoneNumber: string;
  
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  address: string;
}

export class AddEmployeeRequestFamily {
  @Expose()
  @IsNotEmpty({message: "must be not empty"})
  @IsString({message: "must be string"})
  @IsIn(
    ["Single", "Married", "Divorce"],
    {message: arg => {
      const values = arg.constraints[0];
      return "must be " + values
        .slice(0, -1)
        .map(value => `'${value}'`)
        .join(", ") + " or '" + values.at(-1) + "'";
    }}
  )
  maritalStatus: "Single" | "Married" | "Divorce";
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  @IsOptional()
  @ValidateIf(o => o.maritalStatus === "Married")
  @IsDefined({message: "must be defined and not null"})
  @IsObject({message: "must be object"})
  spouse: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  @IsDefined({message: "must be defined and not null"})
  @IsObject({message: "must be object"})
  mother: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  @IsDefined({message: "must be defined and not null"})
  @IsObject({message: "must be object"})
  father: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  @IsDefined({message: "must be defined and not null"})
  @IsArray({message: "must be array"})
  @ValidateNested({each: true, message: null})
  siblings: AddEmployeeRequestFamilyContact[];
  
  @Expose()
  @IsOptional()
  @ValidateIf(o => o.maritalStatus === "Married")
  tanggungan: unknown;
}

export class AddEmployeeRequestLeave {
  @Expose()
  @IsDefined({message: "must be defined and not null"})
  @IsNumber({}, {message: "must be number"})
  totalLeaves: number;
}

export class AddEmployeeRequest {
  @Expose()
  @Type(() => AddEmployeeRequestDetail)
  @IsDefined({message: "must be defined and not null"})
  @ValidateNested({message: "must be object"})
  detail: AddEmployeeRequestDetail;
  
  @Expose()
  @Type(() => AddEmployeeRequestContactAndAddress)
  @IsDefined({message: "must be defined and not null"})
  @ValidateNested({message: "must be object"})
  contactAndAddress: AddEmployeeRequestContactAndAddress;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamily)
  @IsDefined({message: "must be defined and not null"})
  @ValidateNested({message: "must be object"})
  family: AddEmployeeRequestFamily;
  
  @Expose()
  @Type(() => AddEmployeeRequestLeave)
  @IsDefined({message: "must be defined and not null"})
  @ValidateNested({message: "must be object"})
  leave: AddEmployeeRequestLeave;
}
import { Expose, Type } from "class-transformer";

class AddEmployeeRequestDetail {
  @Expose()
  name: string;
  
  @Expose()
  joining: Date;
  
  @Expose()
  end: Date;
  
  @Expose()
  nik: string;
  
  @Expose()
  npwp: string;
  
  @Expose()
  placeOfBirth: string;
  
  @Expose()
  dateOfBirth: Date;
  
  @Expose()
  gender: "Pria" | "Wanita";
  
  @Expose()
  bloodType: "A" | "B" | "AB" | "O";
  
  @Expose()
  religion: "Islam" | "Kristen" | "Hindu" | "Buddha" | "Kong Hu Chu" | "Lainnya";
  
  @Expose()
  latestEducation: "SD" | "SMP" | "SMA/SMK" | "Sarjana" | "Magister" | "Doktor";
  
  @Expose()
  yearOfGraduation: number;
}

class AddEmployeeRequestEmergencyContact {
  @Expose()
  name: string;
  
  @Expose()
  phoneNumber: string;
}

class AddEmployeeRequestContactAndAddress {
  @Expose()
  phoneNumber: string;
  
  @Expose()
  email: string;
  
  @Expose()
  @Type()
  emergencyContact: AddEmployeeRequestEmergencyContact;
  
  @Expose()
  address: string;
  
  @Expose()
  kelurahan: string;
  
  @Expose()
  kecamatan: string;
  
  @Expose()
  city: string;
  
  @Expose()
  province: string;
  
  @Expose()
  zipCode: string;
}

class AddEmployeeRequestFamilyContact {
  @Expose()
  name: string;
  
  @Expose()
  phoneNumber: string;
  
  @Expose()
  address: string;
}

class AddEmployeeRequestFamily {
  @Expose()
  maritalStatus: "Single" | "Married" | "Divorce";
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  spouse: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  mother: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  father: AddEmployeeRequestFamilyContact;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamilyContact)
  siblings: AddEmployeeRequestFamilyContact[];
  
  tanggungan: unknown;
}

class AddEmployeeRequestLeave {
  @Expose()
  totalLeaves: number;
}

export class AddEmployeeRequest {
  @Expose()
  @Type(() => AddEmployeeRequestDetail)
  detail: AddEmployeeRequestDetail;
  
  @Expose()
  @Type(() => AddEmployeeRequestContactAndAddress)
  contactAndAddress: AddEmployeeRequestContactAndAddress;
  
  @Expose()
  @Type(() => AddEmployeeRequestFamily)
  family: AddEmployeeRequestFamily;
  
  @Expose()
  @Type(() => AddEmployeeRequestLeave)
  leave: AddEmployeeRequestLeave;
}
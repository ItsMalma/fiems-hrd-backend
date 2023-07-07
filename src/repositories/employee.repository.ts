import { Collection, InferIdType } from "mongodb";
import { Employee } from "@/entities/employee.entity";

export class EmployeeRepository {
  constructor(
    private employees: Collection<Employee>
  ) {
  
  }
  
  public async save(employee: Employee): Promise<Employee> {
    employee._id = await this.employees.countDocuments() + 1;
    employee.deletedAt = null;
    
    await this.employees.insertOne(employee);
    return employee;
  }
  
  public async findAll(): Promise<Employee[]> {
    return await this.employees.find({deletedAt: null}).toArray();
  }
  
  public async findById(id: InferIdType<Employee>): Promise<Employee> {
    return await this.employees.findOne({_id: id, deletedAt: null});
  }
  
  public async deleteById(id: InferIdType<Employee>): Promise<Employee> {
    const result = await this.employees.findOneAndUpdate(
      {_id: id, deletedAt: null}, {$set: {deletedAt: new Date()}}
    );
    return result.value;
  }
  
  private static singletonInstance: EmployeeRepository | undefined = undefined;
  static getRepository(employeeCollection: Collection<Employee>): EmployeeRepository {
    if (!this.singletonInstance) {
      this.singletonInstance = new EmployeeRepository(employeeCollection);
    }
    
    return this.singletonInstance;
  }
}
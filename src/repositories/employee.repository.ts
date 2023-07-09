import { Collection, InferIdType, MongoServerError, Sort } from "mongodb";
import { Employee } from "@/entities/employee.entity";
import { RepositoryError, RepositoryErrorType } from "@/errors/repository.error";

export class EmployeeRepository {
  constructor(
    private employees: Collection<Employee>
  ) {
  
  }
  
  private handleMongoError(err: MongoServerError) {
    if (err.code === 11000) {
      let message = "";
      switch (Object.keys(err.keyPattern)[0]) {
      case "detail.nik":
        message = "employee with same nik is already exists";
        break;
      case "detail.npwp":
        message = "employee with same npwp is already exists";
        break;
      case "contactAndAddress.phoneNumber":
        message = "employee with same phone number is already exists";
        break;
      case "contactAndAddress.email":
        message = "employee with same email is already exists";
        break;
      }
      throw new RepositoryError(RepositoryErrorType.Duplicate, message);
    }
  }
  
  public async insert(employee: Employee): Promise<Employee> {
    employee._id = await this.employees.countDocuments() + 1;
    employee.deletedAt = null;
    
    try {
      await this.employees.insertOne(employee);
      return employee;
    } catch (err) {
      if (err instanceof MongoServerError)
        this.handleMongoError(err);
    }
  }
  
  public async findAll(sort?: Sort): Promise<Employee[]> {
    return await this.employees.find({deletedAt: null})
      .sort(sort)
      .toArray();
  }
  
  public async findById(id: InferIdType<Employee>): Promise<Employee> {
    return await this.employees.findOne({_id: id, deletedAt: null});
  }
  
  public async count(): Promise<number> {
    return await this.employees.countDocuments();
  }
  
  public async update(id: number, employee: Employee): Promise<Employee> {
    delete employee._id;
    await this.employees.updateOne(
      {_id: id},
      {$set: employee}
    );
    return employee;
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
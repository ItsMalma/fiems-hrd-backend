import { Collection, InferIdType, MongoServerError, Sort } from "mongodb";
import { Attendance } from "@/entities/attendance.entity";
import { RepositoryError, RepositoryErrorType } from "@/errors/repository.error";

export interface AttendanceSort {
  employeeName?: "asc" | "desc"
  date?: "asc" | "desc"
  timeIn?: "asc" | "desc"
  timeOut?: "asc" | "desc"
}

export class AttendanceRepository {
  constructor(
    private attendances: Collection<Attendance>
  ) {
  
  }
  
  private handleMongoError(err: MongoServerError) {
    if (err.code === 11000)
      throw new RepositoryError(
        RepositoryErrorType.Duplicate,
        "attendance with same employee and date already exists"
      );
  }
  
  public async insert(attendance: Attendance): Promise<Attendance> {
    attendance._id = await this.attendances.countDocuments() + 1;
    attendance.deletedtAt = null;
    
    try {
      await this.attendances.insertOne(attendance);
      return attendance;
    } catch (err) {
      if (err instanceof MongoServerError)
        this.handleMongoError(err);
    }
  }
  
  public async findAll(
    date?: Date, filter?: "ontime" | "late" | "overtime",
    skip?: number, limit?: number,
    sort?: AttendanceSort
): Promise<Attendance[]> {
    let cursor = this.attendances.aggregate<Attendance>();
    
    const match = {deletedAt: null};
    if (date)
      match["date"] = date;
    if (filter === "ontime")
      match["timeIn"] = {$lte: 480};
    else if (filter === "late")
      match["timeIn"] = {$gt: 480};
    else if (filter === "overtime")
      match["timeOut"] = {$gt: 1020};
    cursor = cursor.match(match);
    
    const mongoSort: Sort = {};
    if (sort.employeeName)
      mongoSort["employee.name"] = sort.employeeName === "asc" ? 1 : -1;
    else if (sort.date)
      mongoSort["date"] = sort.date === "asc" ? 1 : -1;
    else if (sort.timeIn)
      mongoSort["timeIn"] = sort.timeIn === "asc" ? 1 : -1;
    else if (sort.timeOut)
      mongoSort["timeOut"] = sort.timeOut === "asc" ? 1 : -1;
    else
      mongoSort["_id"] = 1;
    cursor = cursor.sort(mongoSort);
    
    if (skip)
      cursor = cursor.skip(skip);
    
    if (limit)
      cursor = cursor.limit(limit);
    
    return await cursor.toArray();
  }
  
  public async findById(id: InferIdType<Attendance>): Promise<Attendance> {
    return await this.attendances.findOne({_id: id, deletedAt: null});
  }
  
  public async updateById(id: InferIdType<Attendance>, attendance: Attendance) {
    delete attendance._id;
    
    try {
      await this.attendances.updateOne(
        {_id: id},
        {$set: attendance}
      );
      return attendance;
    } catch (err) {
      if (err instanceof MongoServerError)
        this.handleMongoError(err);
    }
  }
  
  public async deleteById(id: InferIdType<Attendance>): Promise<Attendance> {
    const result = await this.attendances.findOneAndUpdate(
      {_id: id, deletedAt: null}, {$set: {deletedAt: new Date()}}
    );
    return result.value;
  }
  
  private static singletonInstance: AttendanceRepository | undefined = undefined;
  static getRepository(employeeCollection: Collection<Attendance>): AttendanceRepository {
    if (!this.singletonInstance) {
      this.singletonInstance = new AttendanceRepository(employeeCollection);
    }
    
    return this.singletonInstance;
  }
}
export class Attendance {
  _id: number;
  employee: {
    id: number;
    name: string;
  };
  date: Date;
  timeIn: number;
  timeOut: number;
  deletedtAt: Date;
}
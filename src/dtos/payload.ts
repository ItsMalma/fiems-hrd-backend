export class Payload<TData, TError> {
  data: TData
  error: TError
  message: string
  
  constructor(data: TData, error: TError, message: string) {
    this.data = data;
    this.error = error;
    this.message = message;
  }
}
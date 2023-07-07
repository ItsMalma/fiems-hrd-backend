export class Payload<TData, TError> {
  data: TData;
  error: TError;
  
  constructor(data: TData, error: TError) {
    this.data = data;
    this.error = error;
  }
}
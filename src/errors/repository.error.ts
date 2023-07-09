export enum RepositoryErrorType {
  Duplicate
}

export class RepositoryError {
  private readonly _type: RepositoryErrorType;
  private readonly _message: string;
  
  constructor(type: RepositoryErrorType, message: string) {
    this._type = type;
    this._message = message;
  }
  
  public get type(): RepositoryErrorType {
    return this._type;
  }
  
  public get message(): string {
    return this._message;
  }
}
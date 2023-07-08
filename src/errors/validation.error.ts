import * as classValidator from "class-validator";

export class ValidationError {
  private values: {[property: string]: string[] | ValidationError} = {};
  
  constructor(validationErrors?: classValidator.ValidationError[]) {
    if (!validationErrors) return;
    
    validationErrors.forEach(validationError => {
      if (validationError.constraints) {
        this.values[validationError.property] = Object
          .keys(validationError.constraints)
          .map(constraint => validationError.constraints[constraint]);
      } else if (validationError.children) {
        this.values[validationError.property] = new ValidationError(validationError.children);
      }
    });
  }
  
  public add(path: string, errors: string[]): ValidationError {
    const properties = path.split(".");
    
    this.values[properties[0]] = properties.length > 1 ? (
      new ValidationError().add(properties.slice(1).join("."), errors)
    ) : errors;
    
    return this;
  }
  
  public has(path: string): boolean {
    const properties = path.split(".");
    
    return properties.length > 1 ? (
      new ValidationError().has(properties.slice(1).join("."))
    ) : properties[0] in this.values;
  }
  
  public toError() {
    const error = {};
    Object.keys(this.values).forEach(property => {
      const value = this.values[property];
      if (value instanceof ValidationError)
        error[property] = value.toError();
      else
        error[property] = value;
    });
    
    return error;
  }
}
import * as classValidator from "class-validator";
import { ValidationError } from "@/errors/validation.error";
import moment from "moment";

export async function validate<T extends object>(target: T): Promise<ValidationError | null> {
  const validationErrors = await classValidator.validate(target);
  if (validationErrors.length < 1) return null;
  return new ValidationError(validationErrors);
}

export function IsDateFormat(format: string, validationOptions?: classValidator.ValidationOptions) {
  return function (obj: object, propertyName: string) {
    classValidator.registerDecorator({
      name: "isDateFormat", target: obj.constructor, propertyName: propertyName,
      constraints: [format], options: validationOptions,
      validator: {
        validate(value: unknown, args: classValidator.ValidationArguments) {
          const [ format ] = args.constraints;
          return moment(value, format, true).isValid();
        },
      },
    });
  };
}
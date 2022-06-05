import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function NotEqualsProperty(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'NotEqualsProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: { message: `${propertyName} cannot equal ${property}`, ...validationOptions},
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value !== relatedValue
        },
      },
    });
  };
}

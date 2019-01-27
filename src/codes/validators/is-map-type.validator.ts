import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

const VALID_MAP_TYPES = ['SUMMONERS_RIFT', 'TWISTED_TREELINE', 'HOWLING_ABYSS'];

export function IsMapType() {
   return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isMapType',
            target: object.constructor,
            propertyName,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return VALID_MAP_TYPES.includes(value);
                },
                defaultMessage(validationArguments: ValidationArguments) {
                    return `Invalid map type of the game (${validationArguments.value}). (Legal values: ${VALID_MAP_TYPES.join(', ')})`;
                },
            },
        });
   };
}

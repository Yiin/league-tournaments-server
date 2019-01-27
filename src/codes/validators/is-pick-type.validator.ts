import {registerDecorator, ValidationArguments} from 'class-validator';

const VALID_PICK_TYPES = ['BLIND_PICK', 'DRAFT_MODE', 'ALL_RANDOM', 'TOURNAMENT_DRAFT'];

export function IsPickType() {
   return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isPickType',
            target: object.constructor,
            propertyName,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return VALID_PICK_TYPES.includes(value);
                },
                defaultMessage(validationArguments: ValidationArguments) {
                    return `Invalid pick type of the game (${validationArguments.value}). (Legal values: ${VALID_PICK_TYPES.join(', ')})`;
                },
            },
        });
   };
}

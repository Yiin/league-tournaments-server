import {registerDecorator, ValidationArguments} from 'class-validator';

const VALID_SPECTATOR_TYPES = ['NONE', 'LOBBYONLY', 'ALL'];

export function IsSpectatorType() {
   return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isSpectatorType',
            target: object.constructor,
            propertyName,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return VALID_SPECTATOR_TYPES.includes(value);
                },
                defaultMessage(validationArguments: ValidationArguments) {
                    return `Invalid spectator type of the game (${validationArguments.value}). (Legal values: ${VALID_SPECTATOR_TYPES.join(', ')})`;
                },
            },
        });
   };
}

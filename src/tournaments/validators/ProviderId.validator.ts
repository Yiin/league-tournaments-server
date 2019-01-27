import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { ProvidersService } from 'src/providers/providers.service';

@ValidatorConstraint({ name: 'providerId', async: false })
@Injectable()
export class ProviderId implements ValidatorConstraintInterface {
    constructor(
        @Inject(ProvidersService) private readonly providersService: ProvidersService,
    ) {}

    validate(value: any, args: ValidationArguments) {
        const provider = this.providersService
            .find(value)
            .value();

        return !!provider;
    }

    defaultMessage(args: ValidationArguments) {
        return `Provider with ID (${args.value}) doesn\'t exist!`;
    }
}

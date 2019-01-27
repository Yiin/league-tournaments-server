import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { ProvidersService } from '../providers.service';

@ValidatorConstraint({ name: 'isUniqueProvider', async: false })
@Injectable()
export class IsUniqueProvider implements ValidatorConstraintInterface {
    constructor(
        @Inject(ProvidersService) private readonly providersService: ProvidersService,
    ) {}

    validate(value: any, args: ValidationArguments) {
        const provider = this.providersService
            .getTable()
            .find({ name: value })
            .value();

        return !provider;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Provider with name ($value) is already created!';
    }
}

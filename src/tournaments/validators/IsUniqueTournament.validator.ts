import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { TournamentsService } from '../tournaments.service';

@ValidatorConstraint({ name: 'isUniqueTournament', async: false })
@Injectable()
export class IsUniqueTournament implements ValidatorConstraintInterface {
    constructor(
        @Inject(TournamentsService) private readonly tournamentService: TournamentsService,
    ) {}

    validate(value: any, args: ValidationArguments) {
        const provider = this.tournamentService
            .getTable()
            .find({ name: value })
            .value();

        return !provider;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Provider with name ($value) is already created!';
    }
}

import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { TournamentsService } from 'src/tournaments/tournaments.service';

@ValidatorConstraint({ name: 'tournamentId', async: false })
@Injectable()
export class TournamentId implements ValidatorConstraintInterface {
    constructor(
        @Inject(TournamentsService) private readonly tournamentsService: TournamentsService,
    ) {}

    validate(value: any, args: ValidationArguments) {
        const tournament = this.tournamentsService
            .find(value)
            .value();

        return !!tournament;
    }

    defaultMessage(args: ValidationArguments) {
        return `Tournament with ID (${args.value}) doesn\'t exist!`;
    }
}

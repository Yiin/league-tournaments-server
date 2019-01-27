import { IsString, Validate, IsNumber } from 'class-validator';
import { IsUniqueTournament } from '../validators/IsUniqueTournament.validator';
import { ProviderId } from '../validators/ProviderId.validator';

export class CreateTournamentDto {
    @IsString()
    @Validate(IsUniqueTournament)
    readonly name: string;

    @IsNumber()
    @Validate(ProviderId)
    readonly providerId: number;
}

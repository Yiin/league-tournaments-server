import { IsNumber, Min, Max, IsString, IsOptional, Validate, IsArray, ValidateNested } from 'class-validator';
import { IsMapType } from '../validators/is-map-type.validator';
import { IsPickType } from '../validators/is-pick-type.validator';
import { IsSpectatorType } from '../validators/is-spectator-type.validator';
import { TournamentId } from '../validators/tournament-id.validator';
import { CodeDto } from './code.dto';

export class CreateCodeDto {
    @Validate(TournamentId)
    tournamentId: number;

    @ValidateNested({ each: true })
    allowedSummonerNames?: string[];

    @IsMapType()
    mapType: CodeDto['mapType'];

    @IsString()
    @IsOptional()
    metadata?: CodeDto['metadata'];

    @IsPickType()
    pickType: CodeDto['pickType'];

    @IsSpectatorType()
    spectatorType: CodeDto['spectatorType'];

    @IsNumber()
    @Min(1)
    @Max(5)
    teamSize: CodeDto['teamSize'];
}

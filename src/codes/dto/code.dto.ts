export class CodeDto {
    code: string;
    tournamentId: number;
    allowedSummonerIds?: number[];
    mapType: MapType;
    metadata?: string;
    pickType: PickType;
    spectatorType: SpectatorType;
    teamSize: 1 | 2 | 3 | 4 | 5;
}

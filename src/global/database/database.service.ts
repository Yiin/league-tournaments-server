import { Injectable } from '@nestjs/common';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { ProviderValueDto } from 'src/providers/dto/provider-value.dto';
import { TournamentDto } from 'src/tournaments/dto/tournament.dto';
import { CodeDto } from 'src/codes/dto/code.dto';

export interface Schema {
    providers: ProviderValueDto[];
    tournaments: TournamentDto[];
    codes: CodeDto[];
}

export type Query<T> = lowdb.LoDashExplicitSyncWrapper<T>;
export type SchemaQuery = Query<Schema>;

@Injectable()
export class DatabaseService {
    database: Query<Schema>;

    constructor() {
        this.database = lowdb(new FileSync<Schema>('db.json'));
    }

    getDatabase() {
        return this.database;
    }
}

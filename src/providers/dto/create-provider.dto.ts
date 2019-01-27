import { IsString, IsIn, Validate } from 'class-validator';
import { IsUniqueProvider } from '../validators/IsUniqueProvider.validator';

export class CreateProviderDto {
    @IsIn(['EUW', 'EUNE', 'NA'])
    readonly region: string;

    @IsString()
    @Validate(IsUniqueProvider)
    readonly name: string;
}

import { ProviderValueDto } from './provider-value.dto';

export class ProviderDto {
    value: () => ProviderValueDto;
}

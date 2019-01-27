import { Injectable, BadGatewayException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RiotApiService {
    private token: string;

    constructor() {
        this.token = process.env.RIOT_API_TOKEN;
    }

    static getApiEndpoint(platform, endpoint) {
        platform = ({
            euw: 'euw1',
            eune: 'eune1',
            na: 'americas',
        })[platform.toLowerCase()] || platform;

        if (endpoint[0] !== '/') {
            endpoint = endpoint.replace(/^/, '/');
        }
        return `https://${platform}.api.riotgames.com/lol${endpoint}`;
    }

    async get(platform, endpoint, params?) {
        try {
            const response = await axios.get(
                RiotApiService.getApiEndpoint(platform, endpoint),
                {
                    params,
                    headers: {
                        'X-Riot-Token': this.token,
                    },
                },
            );
            return response.data;
        } catch (e) {
            throw this.makeRequestException(e);
        }
    }

    async post(platform, endpoint, params?) {
        try {
            const response = await axios.post(
                RiotApiService.getApiEndpoint(platform, endpoint),
                params,
                {
                    headers: {
                        'X-Riot-Token': this.token,
                    },
                },
            );
            return response.data;
        } catch (e) {
            throw this.makeRequestException(e);
        }
    }

    makeRequestException(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return new BadGatewayException(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return new BadGatewayException();
        } else {
            // Something happened in setting up the request that triggered an Error
            return new BadGatewayException(error.message);
        }
    }
}

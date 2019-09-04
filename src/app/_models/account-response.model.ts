import { Response } from './response.model';
import { Data } from './data.model';

export class AccountResponse extends Response{
    data: Data;
    constructor(){super();}
}

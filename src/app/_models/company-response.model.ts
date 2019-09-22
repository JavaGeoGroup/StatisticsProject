import { Response } from './response.model';
import { Company } from './company.model';

export class CompanyResponse extends Response{
    data: Company[];
    constructor(){super();}
}

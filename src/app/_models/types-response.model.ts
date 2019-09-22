import { Type } from './type.model';
import { Response } from './response.model';

export class TypesResponse extends Response{
    data: Type[];
    constructor(){super();}
}

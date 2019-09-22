import { Company } from './company.model'
import { Type } from './type.model';

export class Project {
    clientId: Company;
    projectName: string;
    projectType: Type;
    startDate: Date;
    endDate: Date;
    address: string;
    description: string;
    //picture: FormData;
}

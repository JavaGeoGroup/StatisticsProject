import { Company } from './company.model'
import { Type } from './type.model';
import { Account } from './account.model';

export class Project {
    client: Company;
    projectName: string;
    projectType: Type;
    projectManagerId: Account;
    startDate: Date;
    endDate: Date;
    address: string;
    description: string;
    createDate: Date;
    versionDate: Date;
    //picture: FormData;
}

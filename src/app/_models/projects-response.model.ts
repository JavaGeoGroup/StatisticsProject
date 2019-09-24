import { Response } from './response.model';
import { Project } from './project.model';

export class ProjectsResponse extends Response{
    data: Project[];
    constructor(){super();}
}

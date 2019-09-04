import { Response } from './response.model';
import { Score } from './score.model';

export class ScoresResponse extends Response {
    data: Score[];
    constructor(){super();}
}

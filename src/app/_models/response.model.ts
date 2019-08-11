import { Data } from './data.model';

export class Response {
    errorMessage: string;
    message: string;
    success: boolean;
    data: Data;
}

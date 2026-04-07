export interface ResultModel<T = any> {
    Correct: boolean;
    MessageError: string;
    Exception: any;
    Object: T;  
    Objects: T[]; 
}
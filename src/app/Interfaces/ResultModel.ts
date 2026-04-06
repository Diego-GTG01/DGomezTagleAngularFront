export interface ResultModel<T = any> {
    correct: boolean;
    messageError: string;
    exception: any;
    object: T;  
    Objects: T[]; 
}
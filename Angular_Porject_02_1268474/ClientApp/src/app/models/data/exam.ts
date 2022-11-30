import { ExamResult } from "./exam-result";

export interface Exam {
    examID?:number;
    examName?:string;
    examFee?:Number;
    examResults?:ExamResult[];
}
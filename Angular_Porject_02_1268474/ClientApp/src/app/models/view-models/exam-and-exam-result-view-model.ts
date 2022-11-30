import { ExamResult } from "../data/exam-result";

export interface ExamAndExamResultViewModel {
    examID?:number;
    examName?:string;
    examFee?:number;
    CanDelete?:boolean;
    examResults?:ExamResult[];
}

import { Result } from "../shared/app-constants";
import { Trainee } from "./trainee";

export interface ExamResult {
    traineeID?:number;
    result?:Result;
    trainee?:Trainee;
}

import { PipeTransform } from "@angular/core";
import * as i0 from "@angular/core";
export declare enum Workday {
    So = 0,
    Mo = 1,
    Di = 2,
    Mi = 3,
    Do = 4,
    Fr = 5,
    Sa = 6
}
export declare class WorkDayPipe implements PipeTransform {
    transform(value?: number[], ...args: any[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkDayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<WorkDayPipe, "workday", true>;
}

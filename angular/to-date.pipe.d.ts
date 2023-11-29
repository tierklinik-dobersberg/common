import { Timestamp } from '@bufbuild/protobuf';
import { PipeTransform } from "@angular/core";
import * as i0 from "@angular/core";
export declare class ToDatePipe implements PipeTransform {
    transform(value: Timestamp | Date | string | number, ...args: any[]): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ToDatePipe, "toDate", false>;
}

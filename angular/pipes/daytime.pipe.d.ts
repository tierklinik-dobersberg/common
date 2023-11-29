import { Duration } from '@bufbuild/protobuf';
import { PipeTransform } from "@angular/core";
import { Daytime } from "@tkd/apis";
import * as i0 from "@angular/core";
export declare class DaytimePipe implements PipeTransform {
    transform(value?: Daytime | string, duration?: Duration): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DaytimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DaytimePipe, "daytime", true>;
}

import { PipeTransform } from '@angular/core';
import { PartialMessage, Duration as ProtoDuration } from '@bufbuild/protobuf';
import { DurationLayout, Duration as DurationUtil } from './duration';
import * as i0 from "@angular/core";
export type InputUnit = 'ns' | 'µs' | 'ms' | 's' | 'm' | 'h';
export declare class DurationPipe implements PipeTransform {
    transform(value: BigInt | string | number | DurationUtil | ProtoDuration | PartialMessage<ProtoDuration> | undefined, layout?: DurationLayout, input?: InputUnit): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DurationPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DurationPipe, "duration", true>;
}

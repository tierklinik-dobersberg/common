import { PipeTransform } from "@angular/core";
import * as i0 from "@angular/core";
export declare class TkdInListPipe implements PipeTransform {
    transform<T>(value: T | undefined, list: Iterable<T> | ArrayLike<T> | Set<T> | undefined): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TkdInListPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TkdInListPipe, "inList", true>;
}

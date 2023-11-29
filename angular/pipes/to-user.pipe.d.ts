import { PipeTransform } from "@angular/core";
import { Profile } from "@tkd/apis";
import * as i0 from "@angular/core";
export declare class ToUserPipe implements PipeTransform {
    transform(idOrProfile: Profile | string, profiles: Profile[]): Profile | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToUserPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ToUserPipe, "toUser", true>;
}
export declare class DisplayNamePipe implements PipeTransform {
    transform(value: Profile | null, ...args: any[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisplayNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DisplayNamePipe, "displayName", true>;
}

import { PipeTransform } from "@angular/core";
import { Role } from "@tkd/apis";
import * as i0 from "@angular/core";
export declare class RoleListPipe implements PipeTransform {
    transform(value: string[] | undefined, roles: Role[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoleListPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RoleListPipe, "roleList", true>;
}

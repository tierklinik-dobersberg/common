import { PipeTransform } from "@angular/core";
import { Profile, User } from "@tkd/apis";
import * as i0 from "@angular/core";
declare enum UserExtraKey {
    CalendarID = "calendarId",
    Color = "color"
}
interface UserProfile extends Profile {
    user: User & {
        extra: {
            fields: {
                [UserExtraKey.CalendarID]?: {
                    kind: {
                        case: 'stringValue';
                        value: string;
                    };
                };
                [UserExtraKey.Color]?: {
                    kind: {
                        case: 'stringValue';
                        value: string;
                    };
                };
            };
        };
    };
}
export declare function getUserColor(profile: UserProfile | Profile): string | null;
export declare class UserNamePipe implements PipeTransform {
    static transform(value?: Profile, ...args: any[]): string | undefined;
    transform(value?: Profile, ...args: any[]): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UserNamePipe, "displayName", false>;
}
export declare class UserColorPipe implements PipeTransform {
    transform(value: Profile, ...args: any[]): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserColorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UserColorPipe, "color", false>;
}
export declare class UserContrastColorPipe implements PipeTransform {
    transform(value: Profile, ...args: any[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserContrastColorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UserContrastColorPipe, "contrastColor", false>;
}
export {};

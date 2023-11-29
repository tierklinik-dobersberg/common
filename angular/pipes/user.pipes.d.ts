import { PipeTransform } from "@angular/core";
import { Profile, User } from "@tkd/apis";
import * as i0 from "@angular/core";
export declare enum UserExtraKey {
    CalendarID = "calendarId",
    Color = "color"
}
export interface UserProfile extends Profile {
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
export declare function getCalendarId(user: UserProfile | Profile): string | null;
export declare function getUserColor(user: UserProfile | Profile): string | null;
export declare function parseColor(input: string): number[];
export declare function getContrastFontColor(bgColor: string | null): string;
export declare class UserColorPipe implements PipeTransform {
    transform(value: Profile, ...args: any[]): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserColorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UserColorPipe, "color", true>;
}
export declare class UserContrastColorPipe implements PipeTransform {
    transform(value: Profile, ...args: any[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserContrastColorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UserContrastColorPipe, "contrastColor", true>;
}

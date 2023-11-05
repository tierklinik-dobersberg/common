import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PromiseClient, Transport } from "@bufbuild/connect";
import { AuthService, CalendarService, RoleService, SelfServiceService, UserService, RosterService, WorkShiftService, HolidayService, OffTimeService, WorkTimeService, CommentService } from "@tkd/apis";
import { CallService } from '@tkd/apis/gen/es/tkd/pbx3cx/v1/calllog_connect';
import * as i0 from "@angular/core";
export interface ConnectConfig {
    accountService: string;
    calendarService: string;
    rosterService: string;
    commentService: string;
    callService: string;
}
export declare const CONNECT_CONFIG: InjectionToken<ConnectConfig>;
export declare const AUTH_SERVICE: InjectionToken<AuthServiceClient>;
export declare const SELF_SERVICE: InjectionToken<SelfServiceClient>;
export declare const USER_SERVICE: InjectionToken<UserServiceClient>;
export declare const ROLE_SERVICE: InjectionToken<RoleServiceClient>;
export declare const CALENDAR_SERVICE: InjectionToken<CalendarServiceClient>;
export declare const HOLIDAY_SERVICE: InjectionToken<HolidayServiceClient>;
export declare const ROSTER_SERVICE: InjectionToken<RosterServiceClient>;
export declare const WORK_SHIFT_SERVICE: InjectionToken<WorkShiftServiceClient>;
export declare const CALL_SERVICE: InjectionToken<CallServiceClient>;
export declare const OFFTIME_SERVICE: InjectionToken<OffTimeServiceClient>;
export declare const WORKTIME_SERVICE: InjectionToken<WorkTimeServiceClient>;
export declare const COMMENT_SERVICE: InjectionToken<CommentServiceClient>;
export type AuthServiceClient = PromiseClient<typeof AuthService>;
export type SelfServiceClient = PromiseClient<typeof SelfServiceService>;
export type UserServiceClient = PromiseClient<typeof UserService>;
export type RoleServiceClient = PromiseClient<typeof RoleService>;
export type CalendarServiceClient = PromiseClient<typeof CalendarService>;
export type RosterServiceClient = PromiseClient<typeof RosterService>;
export type CallServiceClient = PromiseClient<typeof CallService>;
export type WorkShiftServiceClient = PromiseClient<typeof WorkShiftService>;
export type HolidayServiceClient = PromiseClient<typeof HolidayService>;
export type OffTimeServiceClient = PromiseClient<typeof OffTimeService>;
export type WorkTimeServiceClient = PromiseClient<typeof WorkTimeService>;
export type CommentServiceClient = PromiseClient<typeof CommentService>;
export declare const connectProviders: Provider[];
export declare function transportFactory(route: ActivatedRoute, router: Router, cfg: ConnectConfig, endpoint: keyof ConnectConfig): Transport;
export declare class TkdConnectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TkdConnectModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TkdConnectModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TkdConnectModule>;
}

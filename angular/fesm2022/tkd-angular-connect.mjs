import * as i0 from '@angular/core';
import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createPromiseClient, ConnectError, Code } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { AuthService, SelfServiceService, UserService, RoleService, CalendarService, HolidayService, RosterService, WorkShiftService, CallService, OffTimeService, WorkTimeService, ConstraintService, CommentService } from '@tkd/apis';

const CONNECT_CONFIG = new InjectionToken('CONNECT_CONFIG');
const AUTH_SERVICE = new InjectionToken('AUTH_SERVICE');
const SELF_SERVICE = new InjectionToken('SELF_SERVICE');
const USER_SERVICE = new InjectionToken('USER_SERVICE');
const ROLE_SERVICE = new InjectionToken('ROLE_SERVICE');
const CALENDAR_SERVICE = new InjectionToken('CALENDAR_SERVICE');
const HOLIDAY_SERVICE = new InjectionToken('HOLIDAY_SERVICE');
const ROSTER_SERVICE = new InjectionToken('ROSTER_SERVICE');
const WORK_SHIFT_SERVICE = new InjectionToken('WORK_SHIFT_SERVICE');
const CALL_SERVICE = new InjectionToken('OVERWRITE_SERVICE');
const OFFTIME_SERVICE = new InjectionToken('OFFTIME_SERVICE');
const WORKTIME_SERVICE = new InjectionToken('WORKTIME_SERVICE');
const COMMENT_SERVICE = new InjectionToken('COMMENT_SERVICE');
const CONSTRAINT_SERVICE = new InjectionToken('CONSTRAINT_SERVICE');
function serviceClientFactory(type, ep) {
    return ((route, router, cfg) => {
        let transport = transportFactory(route, router, cfg, ep);
        return createPromiseClient(type, transport);
    });
}
function makeProvider(token, type, ep) {
    return {
        deps: [
            ActivatedRoute,
            Router,
            CONNECT_CONFIG
        ],
        provide: token,
        useFactory: serviceClientFactory(type, ep),
    };
}
const connectProviders = [
    makeProvider(AUTH_SERVICE, AuthService, "accountService"),
    makeProvider(SELF_SERVICE, SelfServiceService, "accountService"),
    makeProvider(USER_SERVICE, UserService, "accountService"),
    makeProvider(ROLE_SERVICE, RoleService, "accountService"),
    makeProvider(CALENDAR_SERVICE, CalendarService, "calendarService"),
    makeProvider(HOLIDAY_SERVICE, HolidayService, "calendarService"),
    makeProvider(ROSTER_SERVICE, RosterService, "rosterService"),
    makeProvider(WORK_SHIFT_SERVICE, WorkShiftService, "rosterService"),
    makeProvider(CALL_SERVICE, CallService, "callService"),
    makeProvider(OFFTIME_SERVICE, OffTimeService, "rosterService"),
    makeProvider(WORKTIME_SERVICE, WorkTimeService, "rosterService"),
    makeProvider(CONSTRAINT_SERVICE, ConstraintService, "rosterService"),
    makeProvider(COMMENT_SERVICE, CommentService, "commentService")
];
const retryRefreshToken = (transport, activatedRoute, router) => {
    let pendingRefresh = null;
    return (next) => async (req) => {
        try {
            const result = await next(req);
            return result;
        }
        catch (err) {
            const connectErr = ConnectError.from(err);
            // don't retry the request if it was a Login or RefreshToken.
            if (req.service.typeName === AuthService.typeName && (req.method.name === 'Login' || req.method.name == 'RefreshToken')) {
                console.log("skipping retry as requested service is " + `${req.service.typeName}/${req.method.name}`);
                throw err;
            }
            if (connectErr.code === Code.Unauthenticated) {
                if (pendingRefresh === null) {
                    let _resolve;
                    let _reject;
                    pendingRefresh = new Promise((resolve, reject) => {
                        _resolve = resolve;
                        _reject = reject;
                    });
                    pendingRefresh
                        .catch(() => { })
                        .then(() => pendingRefresh = null);
                    const cli = createPromiseClient(AuthService, transport);
                    console.log(`[DEBUG] call to ${req.service.typeName}/${req.method.name} not authenticated, trying to refresh token`);
                    try {
                        let redirect = activatedRoute.snapshot.queryParamMap.get("redirect");
                        if (!redirect && router.getCurrentNavigation() !== null) {
                            redirect = router.getCurrentNavigation().extractedUrl.queryParamMap.get("redirect");
                        }
                        const res = await cli.refreshToken({
                            requestedRedirect: redirect || '',
                        });
                        _resolve();
                    }
                    catch (refreshErr) {
                        console.error("failed to refresh token", refreshErr);
                        _reject(err);
                        throw err;
                    }
                }
                else {
                    // wait for the pending refresh to finish
                    try {
                        await pendingRefresh;
                    }
                    catch (_) {
                        throw err;
                    }
                }
                // retry with a new access token.
                return await next(req);
            }
            throw err;
        }
    };
};
function transportFactory(route, router, cfg, endpoint) {
    const retryTransport = createConnectTransport({ baseUrl: cfg["accountService"], credentials: 'include' });
    return createConnectTransport({
        baseUrl: cfg[endpoint],
        credentials: 'include',
        jsonOptions: {
            ignoreUnknownFields: true
        },
        interceptors: [
            retryRefreshToken(retryTransport, route, router),
        ],
    });
}
class TkdConnectModule {
    static forRoot(cfg) {
        return {
            ngModule: TkdConnectModule,
            providers: [
                {
                    provide: CONNECT_CONFIG,
                    useValue: cfg,
                }
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdConnectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: TkdConnectModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdConnectModule, providers: connectProviders }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdConnectModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: connectProviders,
                }]
        }] });

/*
 * Public API Surface of connect
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AUTH_SERVICE, CALENDAR_SERVICE, CALL_SERVICE, COMMENT_SERVICE, CONNECT_CONFIG, CONSTRAINT_SERVICE, HOLIDAY_SERVICE, OFFTIME_SERVICE, ROLE_SERVICE, ROSTER_SERVICE, SELF_SERVICE, TkdConnectModule, USER_SERVICE, WORKTIME_SERVICE, WORK_SHIFT_SERVICE, connectProviders, transportFactory };
//# sourceMappingURL=tkd-angular-connect.mjs.map

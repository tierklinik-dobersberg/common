import { InjectionToken, NgModule } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Code, ConnectError, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService, CalendarService, RoleService, SelfServiceService, UserService, RosterService, WorkShiftService, HolidayService, OffTimeService, WorkTimeService, CommentService, CallService, ConstraintService } from "@tkd/apis";
import * as i0 from "@angular/core";
export const CONNECT_CONFIG = new InjectionToken('CONNECT_CONFIG');
export const AUTH_SERVICE = new InjectionToken('AUTH_SERVICE');
export const SELF_SERVICE = new InjectionToken('SELF_SERVICE');
export const USER_SERVICE = new InjectionToken('USER_SERVICE');
export const ROLE_SERVICE = new InjectionToken('ROLE_SERVICE');
export const CALENDAR_SERVICE = new InjectionToken('CALENDAR_SERVICE');
export const HOLIDAY_SERVICE = new InjectionToken('HOLIDAY_SERVICE');
export const ROSTER_SERVICE = new InjectionToken('ROSTER_SERVICE');
export const WORK_SHIFT_SERVICE = new InjectionToken('WORK_SHIFT_SERVICE');
export const CALL_SERVICE = new InjectionToken('OVERWRITE_SERVICE');
export const OFFTIME_SERVICE = new InjectionToken('OFFTIME_SERVICE');
export const WORKTIME_SERVICE = new InjectionToken('WORKTIME_SERVICE');
export const COMMENT_SERVICE = new InjectionToken('COMMENT_SERVICE');
export const CONSTRAINT_SERVICE = new InjectionToken('CONSTRAINT_SERVICE');
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
export const connectProviders = [
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
export function transportFactory(route, router, cfg, endpoint) {
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
export { TkdConnectModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TkdConnectModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: connectProviders,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdF9jbGllbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvY29ubmVjdC9jb25uZWN0X2NsaWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFVLGNBQWMsRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQXlDLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFjek8sTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFnQixnQkFBZ0IsQ0FBQyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBb0IsY0FBYyxDQUFDLENBQUM7QUFDbEYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLElBQUksY0FBYyxDQUFvQixjQUFjLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLENBQW9CLGNBQWMsQ0FBQyxDQUFDO0FBQ2xGLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBb0IsY0FBYyxDQUFDLENBQUM7QUFDbEYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQXdCLGtCQUFrQixDQUFD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QUFFLFFBQTZCO0lBQ3ZILE1BQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFBO0lBRXZHLE9BQU8sc0JBQXNCLENBQUM7UUFDNUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDdEIsV0FBVyxFQUFFLFNBQVM7UUFDdEIsV0FBVyxFQUFFO1lBQ1gsbUJBQW1CLEVBQUUsSUFBSTtTQUMxQjtRQUNELFlBQVksRUFBRTtZQUNaLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO1NBQ2pEO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVELE1BR2EsZ0JBQWdCO0lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBa0I7UUFDL0IsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsR0FBRztpQkFDZDthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7K0dBWFUsZ0JBQWdCO2dIQUFoQixnQkFBZ0I7Z0hBQWhCLGdCQUFnQixhQUZoQixnQkFBZ0I7O1NBRWhCLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQUg1QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxnQkFBZ0I7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBDb2RlLCBDb25uZWN0RXJyb3IsIEludGVyY2VwdG9yLCBQcm9taXNlQ2xpZW50LCBUcmFuc3BvcnQsIGNyZWF0ZVByb21pc2VDbGllbnQgfSBmcm9tIFwiQGNvbm5lY3RycGMvY29ubmVjdFwiO1xuaW1wb3J0IHsgY3JlYXRlQ29ubmVjdFRyYW5zcG9ydCB9IGZyb20gXCJAY29ubmVjdHJwYy9jb25uZWN0LXdlYlwiO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UsIENhbGVuZGFyU2VydmljZSwgUm9sZVNlcnZpY2UsIFNlbGZTZXJ2aWNlU2VydmljZSwgVXNlclNlcnZpY2UsIFJvc3RlclNlcnZpY2UsIFdvcmtTaGlmdFNlcnZpY2UsIEhvbGlkYXlTZXJ2aWNlLCBPZmZUaW1lU2VydmljZSwgV29ya1RpbWVTZXJ2aWNlLCBDb21tZW50U2VydmljZSwgQ2FsbFNlcnZpY2UsIENvbnN0cmFpbnRTZXJ2aWNlIH0gZnJvbSBcIkB0a2QvYXBpc1wiO1xuXG4vLyBBbnlGbiBpcyBub3QgZXhwb3JldGVkIGJ5IEBjb25uZWN0cnBjL2Nvbm5lY3RcbnR5cGUgQW55Rm4gPSBJbnRlcmNlcHRvciBleHRlbmRzICgobmV4dDogaW5mZXIgVCkgPT4gaW5mZXIgVCkgPyBUIDogbmV2ZXI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0Q29uZmlnIHtcbiAgYWNjb3VudFNlcnZpY2U6IHN0cmluZztcbiAgY2FsZW5kYXJTZXJ2aWNlOiBzdHJpbmc7XG4gIHJvc3RlclNlcnZpY2U6IHN0cmluZztcbiAgY29tbWVudFNlcnZpY2U6IHN0cmluZztcbiAgY2FsbFNlcnZpY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IENPTk5FQ1RfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPENvbm5lY3RDb25maWc+KCdDT05ORUNUX0NPTkZJRycpO1xuXG5leHBvcnQgY29uc3QgQVVUSF9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPEF1dGhTZXJ2aWNlQ2xpZW50PignQVVUSF9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgU0VMRl9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPFNlbGZTZXJ2aWNlQ2xpZW50PignU0VMRl9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgVVNFUl9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPFVzZXJTZXJ2aWNlQ2xpZW50PignVVNFUl9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgUk9MRV9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPFJvbGVTZXJ2aWNlQ2xpZW50PignUk9MRV9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgQ0FMRU5EQVJfU0VSVklDRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDYWxlbmRhclNlcnZpY2VDbGllbnQ+KCdDQUxFTkRBUl9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgSE9MSURBWV9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPEhvbGlkYXlTZXJ2aWNlQ2xpZW50PignSE9MSURBWV9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgUk9TVEVSX1NFUlZJQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48Um9zdGVyU2VydmljZUNsaWVudD4oJ1JPU1RFUl9TRVJWSUNFJyk7XG5leHBvcnQgY29uc3QgV09SS19TSElGVF9TRVJWSUNFID0gbmV3IEluamVjdGlvblRva2VuPFdvcmtTaGlmdFNlcnZpY2VDbGllbnQ+KCdXT1JLX1NISUZUX1NFUlZJQ0UnKTtcbmV4cG9ydCBjb25zdCBDQUxMX1NFUlZJQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q2FsbFNlcnZpY2VDbGllbnQ+KCdPVkVSV1JJVEVfU0VSVklDRScpO1xuZXhwb3J0IGNvbnN0IE9GRlRJTUVfU0VSVklDRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPZmZUaW1lU2VydmljZUNsaWVudD4oJ09GRlRJTUVfU0VSVklDRScpO1xuZXhwb3J0IGNvbnN0IFdPUktUSU1FX1NFUlZJQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48V29ya1RpbWVTZXJ2aWNlQ2xpZW50PignV09SS1RJTUVfU0VSVklDRScpO1xuZXhwb3J0IGNvbnN0IENPTU1FTlRfU0VSVklDRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb21tZW50U2VydmljZUNsaWVudD4oJ0NPTU1FTlRfU0VSVklDRScpO1xuZXhwb3J0IGNvbnN0IENPTlNUUkFJTlRfU0VSVklDRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25zdHJhaW50U2VydmljZUNsaWVudD4oJ0NPTlNUUkFJTlRfU0VSVklDRScpO1xuXG5leHBvcnQgdHlwZSBBdXRoU2VydmljZUNsaWVudCA9IFByb21pc2VDbGllbnQ8dHlwZW9mIEF1dGhTZXJ2aWNlPjtcbmV4cG9ydCB0eXBlIFNlbGZTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgU2VsZlNlcnZpY2VTZXJ2aWNlPjtcbmV4cG9ydCB0eXBlIFVzZXJTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgVXNlclNlcnZpY2U+O1xuZXhwb3J0IHR5cGUgUm9sZVNlcnZpY2VDbGllbnQgPSBQcm9taXNlQ2xpZW50PHR5cGVvZiBSb2xlU2VydmljZT47XG5leHBvcnQgdHlwZSBDYWxlbmRhclNlcnZpY2VDbGllbnQgPSBQcm9taXNlQ2xpZW50PHR5cGVvZiBDYWxlbmRhclNlcnZpY2U+O1xuZXhwb3J0IHR5cGUgUm9zdGVyU2VydmljZUNsaWVudCA9IFByb21pc2VDbGllbnQ8dHlwZW9mIFJvc3RlclNlcnZpY2U+O1xuZXhwb3J0IHR5cGUgQ2FsbFNlcnZpY2VDbGllbnQgPSBQcm9taXNlQ2xpZW50PHR5cGVvZiBDYWxsU2VydmljZT47XG5leHBvcnQgdHlwZSBXb3JrU2hpZnRTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgV29ya1NoaWZ0U2VydmljZT47XG5leHBvcnQgdHlwZSBIb2xpZGF5U2VydmljZUNsaWVudCA9IFByb21pc2VDbGllbnQ8dHlwZW9mIEhvbGlkYXlTZXJ2aWNlPjtcbmV4cG9ydCB0eXBlIE9mZlRpbWVTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgT2ZmVGltZVNlcnZpY2U+O1xuZXhwb3J0IHR5cGUgV29ya1RpbWVTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgV29ya1RpbWVTZXJ2aWNlPjtcbmV4cG9ydCB0eXBlIENvbW1lbnRTZXJ2aWNlQ2xpZW50ID0gUHJvbWlzZUNsaWVudDx0eXBlb2YgQ29tbWVudFNlcnZpY2U+O1xuZXhwb3J0IHR5cGUgQ29uc3RyYWludFNlcnZpY2VDbGllbnQgPSBQcm9taXNlQ2xpZW50PHR5cGVvZiBDb25zdHJhaW50U2VydmljZT47XG5cbmZ1bmN0aW9uIHNlcnZpY2VDbGllbnRGYWN0b3J5KHR5cGU6IGFueSwgZXA6IGtleW9mIENvbm5lY3RDb25maWcpOiAocm91dGU6IEFjdGl2YXRlZFJvdXRlLCByb3V0ZXI6IFJvdXRlciwgY2ZnOiBDb25uZWN0Q29uZmlnKSA9PiBhbnkge1xuICByZXR1cm4gKChyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHJvdXRlcjogUm91dGVyLCBjZmc6IENvbm5lY3RDb25maWcpID0+IHtcbiAgICBsZXQgdHJhbnNwb3J0ID0gdHJhbnNwb3J0RmFjdG9yeShyb3V0ZSwgcm91dGVyLCBjZmcsIGVwKTtcbiAgICByZXR1cm4gY3JlYXRlUHJvbWlzZUNsaWVudCh0eXBlLCB0cmFuc3BvcnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWFrZVByb3ZpZGVyKHRva2VuOiBJbmplY3Rpb25Ub2tlbjxhbnk+LCB0eXBlOiBhbnksIGVwOiBrZXlvZiBDb25uZWN0Q29uZmlnKTogUHJvdmlkZXIge1xuICByZXR1cm4ge1xuICAgIGRlcHM6IFtcbiAgICAgIEFjdGl2YXRlZFJvdXRlLFxuICAgICAgUm91dGVyLFxuICAgICAgQ09OTkVDVF9DT05GSUdcbiAgICBdLFxuICAgIHByb3ZpZGU6IHRva2VuLFxuICAgIHVzZUZhY3Rvcnk6IHNlcnZpY2VDbGllbnRGYWN0b3J5KHR5cGUsIGVwKSxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29ubmVjdFByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtcbiAgbWFrZVByb3ZpZGVyKEFVVEhfU0VSVklDRSwgQXV0aFNlcnZpY2UsIFwiYWNjb3VudFNlcnZpY2VcIikgLFxuICBtYWtlUHJvdmlkZXIoU0VMRl9TRVJWSUNFLCBTZWxmU2VydmljZVNlcnZpY2UsIFwiYWNjb3VudFNlcnZpY2VcIiksXG4gIG1ha2VQcm92aWRlcihVU0VSX1NFUlZJQ0UsIFVzZXJTZXJ2aWNlLCBcImFjY291bnRTZXJ2aWNlXCIpLFxuICBtYWtlUHJvdmlkZXIoUk9MRV9TRVJWSUNFLCBSb2xlU2VydmljZSwgXCJhY2NvdW50U2VydmljZVwiKSxcbiAgbWFrZVByb3ZpZGVyKENBTEVOREFSX1NFUlZJQ0UsIENhbGVuZGFyU2VydmljZSwgXCJjYWxlbmRhclNlcnZpY2VcIiksXG4gIG1ha2VQcm92aWRlcihIT0xJREFZX1NFUlZJQ0UsIEhvbGlkYXlTZXJ2aWNlLCBcImNhbGVuZGFyU2VydmljZVwiKSxcbiAgbWFrZVByb3ZpZGVyKFJPU1RFUl9TRVJWSUNFLCBSb3N0ZXJTZXJ2aWNlLCBcInJvc3RlclNlcnZpY2VcIiksXG4gIG1ha2VQcm92aWRlcihXT1JLX1NISUZUX1NFUlZJQ0UsIFdvcmtTaGlmdFNlcnZpY2UsIFwicm9zdGVyU2VydmljZVwiKSxcbiAgbWFrZVByb3ZpZGVyKENBTExfU0VSVklDRSwgQ2FsbFNlcnZpY2UsIFwiY2FsbFNlcnZpY2VcIiksXG4gIG1ha2VQcm92aWRlcihPRkZUSU1FX1NFUlZJQ0UsIE9mZlRpbWVTZXJ2aWNlLCBcInJvc3RlclNlcnZpY2VcIiksXG4gIG1ha2VQcm92aWRlcihXT1JLVElNRV9TRVJWSUNFLCBXb3JrVGltZVNlcnZpY2UsIFwicm9zdGVyU2VydmljZVwiKSxcbiAgbWFrZVByb3ZpZGVyKENPTlNUUkFJTlRfU0VSVklDRSwgQ29uc3RyYWludFNlcnZpY2UsIFwicm9zdGVyU2VydmljZVwiKSxcbiAgbWFrZVByb3ZpZGVyKENPTU1FTlRfU0VSVklDRSwgQ29tbWVudFNlcnZpY2UsIFwiY29tbWVudFNlcnZpY2VcIilcbl1cblxuY29uc3QgcmV0cnlSZWZyZXNoVG9rZW46ICh0cmFuc3BvcnQ6IFRyYW5zcG9ydCwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCByb3V0ZXI6IFJvdXRlcikgPT4gSW50ZXJjZXB0b3IgPSAodHJhbnNwb3J0LCBhY3RpdmF0ZWRSb3V0ZSwgcm91dGVyKSA9PiB7XG4gIGxldCBwZW5kaW5nUmVmcmVzaDogUHJvbWlzZTx2b2lkPiB8IG51bGwgPSBudWxsO1xuXG4gIHJldHVybiAobmV4dDogQW55Rm4pID0+IGFzeW5jIChyZXEpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbmV4dChyZXEpXG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb25uZWN0RXJyID0gQ29ubmVjdEVycm9yLmZyb20oZXJyKTtcblxuICAgICAgLy8gZG9uJ3QgcmV0cnkgdGhlIHJlcXVlc3QgaWYgaXQgd2FzIGEgTG9naW4gb3IgUmVmcmVzaFRva2VuLlxuICAgICAgaWYgKHJlcS5zZXJ2aWNlLnR5cGVOYW1lID09PSBBdXRoU2VydmljZS50eXBlTmFtZSAmJiAocmVxLm1ldGhvZC5uYW1lID09PSAnTG9naW4nIHx8IHJlcS5tZXRob2QubmFtZSA9PSAnUmVmcmVzaFRva2VuJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJza2lwcGluZyByZXRyeSBhcyByZXF1ZXN0ZWQgc2VydmljZSBpcyBcIiArIGAke3JlcS5zZXJ2aWNlLnR5cGVOYW1lfS8ke3JlcS5tZXRob2QubmFtZX1gKVxuXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdEVyci5jb2RlID09PSBDb2RlLlVuYXV0aGVudGljYXRlZCkge1xuICAgICAgICBpZiAocGVuZGluZ1JlZnJlc2ggPT09IG51bGwpIHtcbiAgICAgICAgICBsZXQgX3Jlc29sdmU6IGFueTtcbiAgICAgICAgICBsZXQgX3JlamVjdDogYW55O1xuICAgICAgICAgIHBlbmRpbmdSZWZyZXNoID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgcGVuZGluZ1JlZnJlc2hcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7fSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHBlbmRpbmdSZWZyZXNoID0gbnVsbClcblxuICAgICAgICAgIGNvbnN0IGNsaSA9IGNyZWF0ZVByb21pc2VDbGllbnQoQXV0aFNlcnZpY2UsIHRyYW5zcG9ydCk7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhgW0RFQlVHXSBjYWxsIHRvICR7cmVxLnNlcnZpY2UudHlwZU5hbWV9LyR7cmVxLm1ldGhvZC5uYW1lfSBub3QgYXV0aGVudGljYXRlZCwgdHJ5aW5nIHRvIHJlZnJlc2ggdG9rZW5gKVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVkaXJlY3QgPSBhY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmdldChcInJlZGlyZWN0XCIpO1xuICAgICAgICAgICAgaWYgKCFyZWRpcmVjdCAmJiByb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZWRpcmVjdCA9IHJvdXRlci5nZXRDdXJyZW50TmF2aWdhdGlvbigpIS5leHRyYWN0ZWRVcmwucXVlcnlQYXJhbU1hcC5nZXQoXCJyZWRpcmVjdFwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjbGkucmVmcmVzaFRva2VuKHtcbiAgICAgICAgICAgICAgcmVxdWVzdGVkUmVkaXJlY3Q6IHJlZGlyZWN0IHx8ICcnLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgX3Jlc29sdmUoKTtcbiAgICAgICAgICB9IGNhdGNoIChyZWZyZXNoRXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZmFpbGVkIHRvIHJlZnJlc2ggdG9rZW5cIiwgcmVmcmVzaEVycilcblxuICAgICAgICAgICAgX3JlamVjdChlcnIpO1xuXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdhaXQgZm9yIHRoZSBwZW5kaW5nIHJlZnJlc2ggdG8gZmluaXNoXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHBlbmRpbmdSZWZyZXNoO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXRyeSB3aXRoIGEgbmV3IGFjY2VzcyB0b2tlbi5cbiAgICAgICAgcmV0dXJuIGF3YWl0IG5leHQocmVxKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3J0RmFjdG9yeShyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHJvdXRlcjogUm91dGVyLCBjZmc6IENvbm5lY3RDb25maWcsIGVuZHBvaW50OiBrZXlvZiBDb25uZWN0Q29uZmlnKTogVHJhbnNwb3J0IHtcbiAgY29uc3QgcmV0cnlUcmFuc3BvcnQgPSBjcmVhdGVDb25uZWN0VHJhbnNwb3J0KHtiYXNlVXJsOiBjZmdbXCJhY2NvdW50U2VydmljZVwiXSwgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ30pXG5cbiAgcmV0dXJuIGNyZWF0ZUNvbm5lY3RUcmFuc3BvcnQoe1xuICAgIGJhc2VVcmw6IGNmZ1tlbmRwb2ludF0sXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICBqc29uT3B0aW9uczoge1xuICAgICAgaWdub3JlVW5rbm93bkZpZWxkczogdHJ1ZVxuICAgIH0sXG4gICAgaW50ZXJjZXB0b3JzOiBbXG4gICAgICByZXRyeVJlZnJlc2hUb2tlbihyZXRyeVRyYW5zcG9ydCwgcm91dGUsIHJvdXRlciksXG4gICAgXSxcbiAgfSlcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBjb25uZWN0UHJvdmlkZXJzLFxufSlcbmV4cG9ydCBjbGFzcyBUa2RDb25uZWN0TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY2ZnOiBDb25uZWN0Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUa2RDb25uZWN0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUa2RDb25uZWN0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05ORUNUX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogY2ZnLFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59Il19
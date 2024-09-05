import { Inject, InjectionToken, ModuleWithProviders, NgModule, Provider, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Code, ConnectError, Interceptor, PromiseClient, Transport, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { AuthService, NotifyService, RegisteredPasskey, RoleService, SelfServiceService, UserService } from '@tierklinik-dobersberg/apis/idm/v1'
import { CalendarService, HolidayService } from '@tierklinik-dobersberg/apis/calendar/v1';
import { ConstraintService, OffTimeService, RosterChangedEvent, RosterService, WorkShiftService, WorkTimeService } from '@tierklinik-dobersberg/apis/roster/v1';
import { CallService, OnCallChangeEvent, OverwriteCreatedEvent, VoiceMailService } from '@tierklinik-dobersberg/apis/pbx3cx/v1';
import { CustomerService } from '@tierklinik-dobersberg/apis/customer/v1';
import { CommentService } from '@tierklinik-dobersberg/apis/comment/v1';
import { TaskService, BoardService } from '@tierklinik-dobersberg/apis/tasks/v1';
import { EventService } from '@tierklinik-dobersberg/apis/events/v1';
import { createRegistry, IExtensionRegistry, IMessageTypeRegistry } from "@bufbuild/protobuf";

// AnyFn is not exporeted by @connectrpc/connect
type AnyFn = Interceptor extends ((next: infer T) => infer T) ? T : never;

export interface ConnectConfig {
  accountService: string;
  calendarService: string;
  rosterService: string;
  commentService: string;
  callService: string;
  customerService: string;
  eventService: string;
  taskService: string;

  registry?: IMessageTypeRegistry & Partial<IExtensionRegistry>;
}

export type UnauthtenticatedHandlerFunc = (err: ConnectError) => void;

export const CONNECT_CONFIG = new InjectionToken<ConnectConfig>('CONNECT_CONFIG');
export const UNAUTHENCIATED_HANDLER = new InjectionToken<UnauthtenticatedHandlerFunc[]>('UNAUTHENTICATED_HANDLER');

export const AUTH_SERVICE = new InjectionToken<AuthServiceClient>('AUTH_SERVICE');
export const SELF_SERVICE = new InjectionToken<SelfServiceClient>('SELF_SERVICE');
export const USER_SERVICE = new InjectionToken<UserServiceClient>('USER_SERVICE');
export const ROLE_SERVICE = new InjectionToken<RoleServiceClient>('ROLE_SERVICE');
export const CALENDAR_SERVICE = new InjectionToken<CalendarServiceClient>('CALENDAR_SERVICE');
export const HOLIDAY_SERVICE = new InjectionToken<HolidayServiceClient>('HOLIDAY_SERVICE');
export const ROSTER_SERVICE = new InjectionToken<RosterServiceClient>('ROSTER_SERVICE');
export const WORK_SHIFT_SERVICE = new InjectionToken<WorkShiftServiceClient>('WORK_SHIFT_SERVICE');
export const CALL_SERVICE = new InjectionToken<CallServiceClient>('OVERWRITE_SERVICE');
export const OFFTIME_SERVICE = new InjectionToken<OffTimeServiceClient>('OFFTIME_SERVICE');
export const WORKTIME_SERVICE = new InjectionToken<WorkTimeServiceClient>('WORKTIME_SERVICE');
export const COMMENT_SERVICE = new InjectionToken<CommentServiceClient>('COMMENT_SERVICE');
export const CONSTRAINT_SERVICE = new InjectionToken<ConstraintServiceClient>('CONSTRAINT_SERVICE');
export const NOTIFY_SERIVCE = new InjectionToken<NotifyServiceClient>('NOTIFY_SERVICE');
export const CUSTOMER_SERVICE = new InjectionToken<CustomerServiceClient>('CUSTOMER_SERVICE');
export const VOICE_MAIL_SERIVCE = new InjectionToken<VoiceMailServiceClient>('VOICE_MAIL_SERVICE')
export const EVENT_SERVICE = new InjectionToken<EventServiceClient>('EVENT_SERVICE')
export const TASK_SERVICE = new InjectionToken<TaskServiceClient>('TASK_SERVICE');
export const BOARD_SERVICE = new InjectionToken<BoardServiceClient>('TASK_SERVICE');

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
export type ConstraintServiceClient = PromiseClient<typeof ConstraintService>;
export type NotifyServiceClient = PromiseClient<typeof NotifyService>;
export type CustomerServiceClient = PromiseClient<typeof CustomerService>;
export type VoiceMailServiceClient = PromiseClient<typeof VoiceMailService>;
export type EventServiceClient = PromiseClient<typeof EventService>;
export type TaskServiceClient = PromiseClient<typeof TaskService>;
export type BoardServiceClient = PromiseClient<typeof BoardService>;

function serviceClientFactory(type: any, ep: Exclude<keyof ConnectConfig, 'registry'>) {
  return ((route: ActivatedRoute, router: Router, cfg: ConnectConfig, handler: UnauthtenticatedHandlerFunc[]) => {
    let transport = transportFactory(route, router, cfg, ep, handler);
    return createPromiseClient(type, transport);
  });
}

function makeProvider(token: InjectionToken<any>, type: any, ep: Exclude<keyof ConnectConfig, 'registry'>): Provider {
  return {
    deps: [
      ActivatedRoute,
      Router,
      CONNECT_CONFIG,
      UNAUTHENCIATED_HANDLER,
    ],
    provide: token,
    useFactory: serviceClientFactory(type, ep),
  }
}

export const connectProviders: Provider[] = [
  makeProvider(AUTH_SERVICE, AuthService, "accountService") ,
  makeProvider(SELF_SERVICE, SelfServiceService, "accountService"),
  makeProvider(USER_SERVICE, UserService, "accountService"),
  makeProvider(ROLE_SERVICE, RoleService, "accountService"),
  makeProvider(NOTIFY_SERIVCE, NotifyService, "accountService"),
  makeProvider(CALENDAR_SERVICE, CalendarService, "calendarService"),
  makeProvider(HOLIDAY_SERVICE, HolidayService, "calendarService"),
  makeProvider(ROSTER_SERVICE, RosterService, "rosterService"),
  makeProvider(WORK_SHIFT_SERVICE, WorkShiftService, "rosterService"),
  makeProvider(CALL_SERVICE, CallService, "callService"),
  makeProvider(VOICE_MAIL_SERIVCE, VoiceMailService, "callService"),
  makeProvider(OFFTIME_SERVICE, OffTimeService, "rosterService"),
  makeProvider(WORKTIME_SERVICE, WorkTimeService, "rosterService"),
  makeProvider(CONSTRAINT_SERVICE, ConstraintService, "rosterService"),
  makeProvider(COMMENT_SERVICE, CommentService, "commentService"),
  makeProvider(CUSTOMER_SERVICE, CustomerService, "customerService"),
  makeProvider(EVENT_SERVICE, EventService, "eventService"),
  makeProvider(TASK_SERVICE, TaskService, "taskService"),
  makeProvider(BOARD_SERVICE, BoardService, "taskService")
]

export function injectAuthService(): AuthServiceClient {
  return inject(AUTH_SERVICE);
}

export function injectSelfService(): SelfServiceClient {
  return inject(SELF_SERVICE);
}

export function injectUserService(): UserServiceClient {
  return inject(USER_SERVICE);
}

export function injectRoleService(): RoleServiceClient {
  return inject(ROLE_SERVICE)
}

export function injectNotifyService(): NotifyServiceClient {
  return inject(NOTIFY_SERIVCE);
}

export function injectCalendarService(): CalendarServiceClient {
  return inject(CALENDAR_SERVICE)
}

export function injectHolidayService(): HolidayServiceClient {
  return inject(HOLIDAY_SERVICE)
}

export function injectRosterService(): RosterServiceClient {
  return inject(ROSTER_SERVICE)
}

export function injectWorkShiftService(): WorkShiftServiceClient {
  return inject(WORK_SHIFT_SERVICE)
}

export function injectCallService(): CallServiceClient {
  return inject(CALL_SERVICE)
}

export function injectOfftimeService(): OffTimeServiceClient {
  return inject(OFFTIME_SERVICE)
}

export function injectWorktimeSerivce(): WorkTimeServiceClient {
  return inject(WORKTIME_SERVICE);
}

export function injectCommentService(): CommentServiceClient {
  return inject(COMMENT_SERVICE);
}

export function injectCustomerService(): CustomerServiceClient {
  return inject(CUSTOMER_SERVICE);
}

export function injectVoiceMailService(): VoiceMailServiceClient {
  return inject(VOICE_MAIL_SERIVCE);
}

export function injectEventService(): EventServiceClient {
  return inject(EVENT_SERVICE);
}

export function injectBoardService(): BoardServiceClient {
  return inject(BOARD_SERVICE)
}

export function injectTaskService(): TaskServiceClient {
  return inject(TASK_SERVICE);
}

const retryRefreshToken: (transport: Transport, activatedRoute: ActivatedRoute, router: Router, handler: UnauthtenticatedHandlerFunc[]) => Interceptor = (transport, activatedRoute, router, handler) => {
  let pendingRefresh: Promise<void> | null = null;

  return (next: AnyFn) => async (req) => {
    try {
      const result = await next(req)
      return result;

    } catch (err) {
      const connectErr = ConnectError.from(err);

      // don't retry the request if it was a Login or RefreshToken.
      if (req.service.typeName === AuthService.typeName && (req.method.name === 'Login' || req.method.name == 'RefreshToken')) {
        console.log("skipping retry as requested service is " + `${req.service.typeName}/${req.method.name}`)

        throw err
      }

      if (connectErr.code === Code.Unauthenticated) {
        if (pendingRefresh === null) {
          let _resolve: any;
          let _reject: any;
          pendingRefresh = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
          })

          pendingRefresh
            .catch(() => {})
            .then(() => pendingRefresh = null)

          const cli = createPromiseClient(AuthService, transport);

          console.log(`[DEBUG] call to ${req.service.typeName}/${req.method.name} not authenticated, trying to refresh token`)
          try {
            let redirect = activatedRoute.snapshot.queryParamMap.get("redirect");
            if (!redirect && router.getCurrentNavigation() !== null) {
              redirect = router.getCurrentNavigation()!.extractedUrl.queryParamMap.get("redirect")
            }

            const res = await cli.refreshToken({
              requestedRedirect: redirect || '',
            })

            _resolve();
          } catch (refreshErr) {
            console.error("failed to refresh token", refreshErr)

            handler?.forEach(handler => {
              handler(ConnectError.from(refreshErr));
            })

            _reject(err);

            throw err;
          }
        } else {
          // wait for the pending refresh to finish
          try {
            await pendingRefresh;
          } catch (_) {
            throw err;
          }
        }

        // retry with a new access token.
        return await next(req);
      }

      throw err;
    }
  }
}

const defaultRegistry = createRegistry(
    RosterChangedEvent,
    OnCallChangeEvent,
    OverwriteCreatedEvent,
)

export function transportFactory(route: ActivatedRoute, router: Router, cfg: ConnectConfig, endpoint: Exclude<keyof ConnectConfig, 'registry'>, handler: UnauthtenticatedHandlerFunc[]): Transport {
  const retryTransport = createConnectTransport({baseUrl: cfg["accountService"], credentials: 'include'})

  return createConnectTransport({
    baseUrl: cfg[endpoint],
    credentials: 'include',
    jsonOptions: {
      ignoreUnknownFields: true,
      typeRegistry: cfg.registry || defaultRegistry,
    },
    interceptors: [
      retryRefreshToken(retryTransport, route, router, handler),
    ],
  })
}

@NgModule({
  providers: connectProviders,
})
export class TkdConnectModule {
  static forRoot(cfg: ConnectConfig, handler?: UnauthtenticatedHandlerFunc[]): ModuleWithProviders<TkdConnectModule> {
    return {
      ngModule: TkdConnectModule,
      providers: [
        {
          provide: CONNECT_CONFIG,
          useValue: cfg,
        },
        {
          provide: UNAUTHENCIATED_HANDLER,
          useValue: handler || []
        },
      ]
    }
  }
}
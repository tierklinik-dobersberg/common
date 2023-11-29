import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
export var Workday;
(function (Workday) {
    Workday[Workday["So"] = 0] = "So";
    Workday[Workday["Mo"] = 1] = "Mo";
    Workday[Workday["Di"] = 2] = "Di";
    Workday[Workday["Mi"] = 3] = "Mi";
    Workday[Workday["Do"] = 4] = "Do";
    Workday[Workday["Fr"] = 5] = "Fr";
    Workday[Workday["Sa"] = 6] = "Sa";
})(Workday || (Workday = {}));
class WorkDayPipe {
    transform(value, ...args) {
        if (!value) {
            return '';
        }
        return value
            .map(day => Workday[day])
            .join(', ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, isStandalone: true, name: "workday" }); }
}
export { WorkDayPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: WorkDayPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'workday',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2RheS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvcGlwZXMvd29ya2RheS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFBOztBQUVuRCxNQUFNLENBQU4sSUFBWSxPQVFYO0FBUkQsV0FBWSxPQUFPO0lBQ2pCLGlDQUFFLENBQUE7SUFDRixpQ0FBRSxDQUFBO0lBQ0YsaUNBQUUsQ0FBQTtJQUNGLGlDQUFFLENBQUE7SUFDRixpQ0FBRSxDQUFBO0lBQ0YsaUNBQUUsQ0FBQTtJQUNGLGlDQUFFLENBQUE7QUFDSixDQUFDLEVBUlcsT0FBTyxLQUFQLE9BQU8sUUFRbEI7QUFFRCxNQUthLFdBQVc7SUFFdEIsU0FBUyxDQUFDLEtBQWdCLEVBQUUsR0FBRyxJQUFXO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQTtTQUNWO1FBRUQsT0FBTyxLQUFLO2FBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNmLENBQUM7K0dBVlUsV0FBVzs2R0FBWCxXQUFXOztTQUFYLFdBQVc7NEZBQVgsV0FBVztrQkFMdkIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuXG5leHBvcnQgZW51bSBXb3JrZGF5IHtcbiAgU28sXG4gIE1vLFxuICBEaSxcbiAgTWksXG4gIERvLFxuICBGcixcbiAgU2EsXG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3dvcmtkYXknLFxuICBwdXJlOiB0cnVlLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBXb3JrRGF5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHRyYW5zZm9ybSh2YWx1ZT86IG51bWJlcltdLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICAgICAgLm1hcChkYXkgPT4gV29ya2RheVtkYXldKVxuICAgICAgLmpvaW4oJywgJylcbiAgfVxufVxuIl19
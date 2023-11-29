import { Pipe } from "@angular/core";
import { Daytime } from "@tkd/apis";
import { padLeft } from "./utils";
import * as i0 from "@angular/core";
class DaytimePipe {
    transform(value, duration) {
        if (!value) {
            return '';
        }
        if (typeof value === 'string') {
            const parts = value.split(":");
            if (parts.length != 2) {
                return '';
            }
            const hour = BigInt(+parts[0]);
            const minute = BigInt(+parts[1]);
            value = new Daytime({
                hour,
                minute,
            });
        }
        if (duration !== undefined) {
            const seconds = Number(value.hour) * 60 * 60 + Number(value.minute) * 60 + Number(duration.seconds);
            const hour = Math.floor(seconds / 60 / 60);
            const minutes = Math.floor((seconds - (hour * 60 * 60)) / 60);
            value = new Daytime({
                hour: BigInt(hour),
                minute: BigInt(minutes),
            });
        }
        return padLeft(`${value.hour}`, 2, '0') + ':' + padLeft(`${value.minute}`, 2, '0');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, isStandalone: true, name: "daytime" }); }
}
export { DaytimePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DaytimePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'daytime',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5dGltZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvcGlwZXMvZGF5dGltZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFbEMsTUFLYSxXQUFXO0lBQ3RCLFNBQVMsQ0FBQyxLQUF3QixFQUFFLFFBQW1CO1FBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQTtTQUNWO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakMsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDO2dCQUNsQixJQUFJO2dCQUNKLE1BQU07YUFDUCxDQUFDLENBQUE7U0FDSDtRQUVELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM3RixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDMUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUUsQ0FBQztZQUVoRSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN4QixDQUFDLENBQUE7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNwRixDQUFDOytHQWpDVSxXQUFXOzZHQUFYLFdBQVc7O1NBQVgsV0FBVzs0RkFBWCxXQUFXO2tCQUx2QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLFVBQVUsRUFBRSxJQUFJO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER1cmF0aW9uIH0gZnJvbSAnQGJ1ZmJ1aWxkL3Byb3RvYnVmJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRGF5dGltZSB9IGZyb20gXCJAdGtkL2FwaXNcIjtcbmltcG9ydCB7IHBhZExlZnQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdkYXl0aW1lJyxcbiAgcHVyZTogdHJ1ZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF5dGltZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKHZhbHVlPzogRGF5dGltZSB8IHN0cmluZywgZHVyYXRpb24/OiBEdXJhdGlvbikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiOlwiKVxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaG91ciA9IEJpZ0ludCgrcGFydHNbMF0pO1xuICAgICAgY29uc3QgbWludXRlID0gQmlnSW50KCtwYXJ0c1sxXSk7XG5cbiAgICAgIHZhbHVlID0gbmV3IERheXRpbWUoe1xuICAgICAgICBob3VyLFxuICAgICAgICBtaW51dGUsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBzZWNvbmRzID0gTnVtYmVyKHZhbHVlLmhvdXIpKjYwKjYwICsgTnVtYmVyKHZhbHVlLm1pbnV0ZSkqNjAgKyBOdW1iZXIoZHVyYXRpb24uc2Vjb25kcylcbiAgICAgIGNvbnN0IGhvdXIgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCAvIDYwKVxuICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoIChzZWNvbmRzIC0gKGhvdXIgKiA2MCAqIDYwKSkgLyA2MCApO1xuXG4gICAgICB2YWx1ZSA9IG5ldyBEYXl0aW1lKHtcbiAgICAgICAgaG91cjogQmlnSW50KGhvdXIpLFxuICAgICAgICBtaW51dGU6IEJpZ0ludChtaW51dGVzKSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZExlZnQoYCR7dmFsdWUuaG91cn1gLCAyLCAnMCcpICsgJzonICsgcGFkTGVmdChgJHt2YWx1ZS5taW51dGV9YCwgMiwgJzAnKVxuICB9XG59XG4iXX0=
import { isDevMode, Pipe } from '@angular/core';
import { Duration as ProtoDuration } from '@bufbuild/protobuf';
import { Duration as DurationUtil } from './duration';
import * as i0 from "@angular/core";
class DurationPipe {
    transform(value, layout = 'default', input = 's') {
        if (value === undefined || value === null) {
            return '';
        }
        if (value instanceof ProtoDuration || (typeof value === 'object' && value.hasOwnProperty('seconds'))) {
            value = value.seconds;
            if (input !== 's') {
                throw new Error('invalid input type when Duration from @bufbuild/protobuf is passed');
            }
        }
        value = Number(value);
        let d;
        switch (input) {
            case 'h':
                d = DurationUtil.hours(+value);
                break;
            case 'm':
                d = DurationUtil.minutes(+value);
                break;
            case 's':
                d = DurationUtil.seconds(+value);
                break;
            case 'ms':
                d = DurationUtil.milliseconds(+value);
                break;
            case 'µs':
                d = DurationUtil.microseconds(+value);
                break;
            case 'ns':
                d = DurationUtil.nanoseconds(+value);
                break;
            default:
                if (isDevMode()) {
                    return 'WRONG_LAYOUT';
                }
                return '';
        }
        return d.format(layout);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, isStandalone: true, name: "duration" }); }
}
export { DurationPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DurationPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'duration',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVyYXRpb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rldi9jb21wb25lbnRzL3BpcGVzL2R1cmF0aW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBa0IsUUFBUSxJQUFJLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9FLE9BQU8sRUFBa0IsUUFBUSxJQUFJLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFJdEUsTUFLYSxZQUFZO0lBQ3ZCLFNBQVMsQ0FBQyxLQUEwRyxFQUFFLFNBQXlCLFNBQVMsRUFBRSxRQUFtQixHQUFHO1FBQzlLLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLEtBQUssWUFBWSxhQUFhLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO1lBQ3BHLEtBQUssR0FBSSxLQUF1QixDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQzthQUN2RjtTQUNGO1FBRUQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQWUsQ0FBQztRQUNwQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssR0FBRztnQkFDTixDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssSUFBSTtnQkFDUCxDQUFDLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLENBQUMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsQ0FBQyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUNSO2dCQUNFLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQ2YsT0FBTyxjQUFjLENBQUM7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQzsrR0EzQ1UsWUFBWTs2R0FBWixZQUFZOztTQUFaLFlBQVk7NEZBQVosWUFBWTtrQkFMeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWFsTWVzc2FnZSwgRHVyYXRpb24gYXMgUHJvdG9EdXJhdGlvbiB9IGZyb20gJ0BidWZidWlsZC9wcm90b2J1Zic7XG5pbXBvcnQgeyBEdXJhdGlvbkxheW91dCwgRHVyYXRpb24gYXMgRHVyYXRpb25VdGlsIH0gZnJvbSAnLi9kdXJhdGlvbic7XG5cbmV4cG9ydCB0eXBlIElucHV0VW5pdCA9ICducycgfCAnwrVzJyB8ICdtcycgfCAncycgfCAnbScgfCAnaCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2R1cmF0aW9uJyxcbiAgcHVyZTogdHJ1ZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgRHVyYXRpb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogQmlnSW50IHwgc3RyaW5nIHwgbnVtYmVyIHwgRHVyYXRpb25VdGlsIHwgUHJvdG9EdXJhdGlvbiB8IFBhcnRpYWxNZXNzYWdlPFByb3RvRHVyYXRpb24+IHwgdW5kZWZpbmVkLCBsYXlvdXQ6IER1cmF0aW9uTGF5b3V0ID0gJ2RlZmF1bHQnLCBpbnB1dDogSW5wdXRVbml0ID0gJ3MnKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb3RvRHVyYXRpb24gfHwgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ3NlY29uZHMnKSkpIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIFByb3RvRHVyYXRpb24pLnNlY29uZHM7XG4gICAgICBpZiAoaW5wdXQgIT09ICdzJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5wdXQgdHlwZSB3aGVuIER1cmF0aW9uIGZyb20gQGJ1ZmJ1aWxkL3Byb3RvYnVmIGlzIHBhc3NlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblxuICAgIGxldCBkOiBEdXJhdGlvblV0aWw7XG4gICAgc3dpdGNoIChpbnB1dCkge1xuICAgICAgY2FzZSAnaCc6XG4gICAgICAgIGQgPSBEdXJhdGlvblV0aWwuaG91cnMoK3ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgZCA9IER1cmF0aW9uVXRpbC5taW51dGVzKCt2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncyc6XG4gICAgICAgIGQgPSBEdXJhdGlvblV0aWwuc2Vjb25kcygrdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgZCA9IER1cmF0aW9uVXRpbC5taWxsaXNlY29uZHMoK3ZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICfCtXMnOlxuICAgICAgICBkID0gRHVyYXRpb25VdGlsLm1pY3Jvc2Vjb25kcygrdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25zJzpcbiAgICAgICAgZCA9IER1cmF0aW9uVXRpbC5uYW5vc2Vjb25kcygrdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHJldHVybiAnV1JPTkdfTEFZT1VUJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQuZm9ybWF0KGxheW91dCk7XG4gIH1cbn1cbiJdfQ==
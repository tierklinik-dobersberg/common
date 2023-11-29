import { Pipe } from "@angular/core";
import * as i0 from "@angular/core";
class RoleListPipe {
    transform(value, roles) {
        if (!value) {
            return '';
        }
        return value
            .map(id => roles.find(role => role.id === id))
            .filter(role => !!role)
            .map(role => role.name)
            .join(', ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, isStandalone: true, name: "roleList" }); }
}
export { RoleListPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RoleListPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'roleList',
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1saXN0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kZXYvY29tcG9uZW50cy9waXBlcy9yb2xlLWxpc3QucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQTs7QUFHbkQsTUFLYSxZQUFZO0lBRXZCLFNBQVMsQ0FBQyxLQUEyQixFQUFFLEtBQWE7UUFDbEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7UUFFRCxPQUFPLEtBQUs7YUFDVCxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUM7YUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2YsQ0FBQzsrR0FaVSxZQUFZOzZHQUFaLFlBQVk7O1NBQVosWUFBWTs0RkFBWixZQUFZO2tCQUx4QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsSUFBSTtvQkFDVixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCJAdGtkL2FwaXNcIlxuXG5AUGlwZSh7XG4gIG5hbWU6ICdyb2xlTGlzdCcsXG4gIHB1cmU6IHRydWUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIFJvbGVMaXN0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nW10gfCB1bmRlZmluZWQsIHJvbGVzOiBSb2xlW10pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgICAgIC5tYXAoaWQgPT4gcm9sZXMuZmluZChyb2xlID0+IHJvbGUuaWQgPT09IGlkKSlcbiAgICAgIC5maWx0ZXIocm9sZSA9PiAhIXJvbGUpXG4gICAgICAubWFwKHJvbGUgPT4gcm9sZSEubmFtZSlcbiAgICAgIC5qb2luKCcsICcpXG4gIH1cbn1cbiJdfQ==
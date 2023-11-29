import { Pipe } from "@angular/core";
import { Profile } from "@tkd/apis";
import * as i0 from "@angular/core";
class ToUserPipe {
    transform(idOrProfile, profiles) {
        if (idOrProfile instanceof Profile) {
            return idOrProfile;
        }
        return profiles.find(p => p.user?.id === idOrProfile) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, isStandalone: true, name: "toUser" }); }
}
export { ToUserPipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ToUserPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'toUser',
                    pure: true,
                    standalone: true,
                }]
        }] });
class DisplayNamePipe {
    transform(value, ...args) {
        if (!value) {
            return '';
        }
        if (value.user?.displayName) {
            return value.user.displayName;
        }
        if (value.user?.username) {
            return value.user.username;
        }
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, isStandalone: true, name: "displayName" }); }
}
export { DisplayNamePipe };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DisplayNamePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: "displayName",
                    pure: true,
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tdXNlci5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvcGlwZXMvdG8tdXNlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBRXBDLE1BS2EsVUFBVTtJQUNyQixTQUFTLENBQUMsV0FBNkIsRUFBRSxRQUFtQjtRQUMxRCxJQUFJLFdBQVcsWUFBWSxPQUFPLEVBQUU7WUFDbEMsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDaEUsQ0FBQzsrR0FQVSxVQUFVOzZHQUFWLFVBQVU7O1NBQVYsVUFBVTs0RkFBVixVQUFVO2tCQUx0QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxJQUFJO29CQUNWLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs7QUFXRCxNQUthLGVBQWU7SUFDMUIsU0FBUyxDQUFDLEtBQXFCLEVBQUUsR0FBRyxJQUFXO1FBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQTtTQUNWO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1NBQzNCO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOytHQWZVLGVBQWU7NkdBQWYsZUFBZTs7U0FBZixlQUFlOzRGQUFmLGVBQWU7a0JBTDNCLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxJQUFJO29CQUNWLFVBQVUsRUFBRSxJQUFJO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUHJvZmlsZSB9IGZyb20gXCJAdGtkL2FwaXNcIjtcblxuQFBpcGUoe1xuICBuYW1lOiAndG9Vc2VyJyxcbiAgcHVyZTogdHJ1ZSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgVG9Vc2VyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaWRPclByb2ZpbGU6IFByb2ZpbGUgfCBzdHJpbmcsIHByb2ZpbGVzOiBQcm9maWxlW10pOiBQcm9maWxlIHwgbnVsbCB7XG4gICAgaWYgKGlkT3JQcm9maWxlIGluc3RhbmNlb2YgUHJvZmlsZSkge1xuICAgICAgcmV0dXJuIGlkT3JQcm9maWxlO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9maWxlcy5maW5kKHAgPT4gcC51c2VyPy5pZCA9PT0gaWRPclByb2ZpbGUpIHx8IG51bGw7XG4gIH1cbn1cblxuQFBpcGUoe1xuICBuYW1lOiBcImRpc3BsYXlOYW1lXCIsXG4gIHB1cmU6IHRydWUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIERpc3BsYXlOYW1lUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IFByb2ZpbGUgfCBudWxsLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlLnVzZXI/LmRpc3BsYXlOYW1lKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS51c2VyLmRpc3BsYXlOYW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUudXNlcj8udXNlcm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnVzZXIudXNlcm5hbWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=
//import { UserNamePipe } from '@tkd/angular';
import { USER_SERVICE } from '@tkd/angular/connect';
import { inject } from "@angular/core";
export function getCKEditorConfig() {
    const idmService = inject(USER_SERVICE);
    //const userNamePipe = inject(UserNamePipe)
    return {
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: (queryText) => {
                        console.log("query-text for mention: " + queryText);
                        /*
                                                idmService
                                                    .listUsers({
                                                        fieldMask: {
                                                            paths: ['users.user.id', 'users.user.display_name', 'users.user.first_name']
                                                        }
                                                    })
                                                    .then(response => response.users)
                                                    .then(users => {
                                                        return users.filter(profile => {
                                                            return profile.user?.username.toLowerCase().includes(queryText)
                                                                || profile.user?.firstName?.toLowerCase().includes(queryText)
                                                                || profile.user?.displayName?.toLowerCase().includes(queryText)
                                                        })
                                                    })
                                                    .then(response => {
                                                        return response
                                                            .map(profile => {
                                                                return {
                                                                    id: '@' + profile!.user!.username,
                                                                    userId: profile!.user!.id,
                                                                    name: userNamePipe.transform(profile),
                                                                }
                                                            })
                                                    })
                        */
                    }
                }
            ]
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGV2L2NvbXBvbmVudHMvY2tlZGl0b3IvY2tlZGl0b3IuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxNQUFNLFVBQVUsaUJBQWlCO0lBQzdCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QywyQ0FBMkM7SUFFM0MsT0FBTztRQUNILE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRTtnQkFDSDtvQkFDSSxNQUFNLEVBQUUsR0FBRztvQkFDWCxJQUFJLEVBQUUsQ0FBQyxTQUFpQixFQUFFLEVBQUU7d0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsU0FBUyxDQUFDLENBQUM7d0JBQzVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQXlCRTtvQkFDa0IsQ0FBQztpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFBO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHsgVXNlck5hbWVQaXBlIH0gZnJvbSAnQHRrZC9hbmd1bGFyJztcbmltcG9ydCB7IFVTRVJfU0VSVklDRSB9IGZyb20gJ0B0a2QvYW5ndWxhci9jb25uZWN0JztcbmltcG9ydCB7IGluamVjdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDS0VkaXRvckNvbmZpZygpOiBhbnkge1xuICAgIGNvbnN0IGlkbVNlcnZpY2UgPSBpbmplY3QoVVNFUl9TRVJWSUNFKTtcbiAgICAvL2NvbnN0IHVzZXJOYW1lUGlwZSA9IGluamVjdChVc2VyTmFtZVBpcGUpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZW50aW9uOiB7XG4gICAgICAgICAgICBmZWVkczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyOiAnQCcsXG4gICAgICAgICAgICAgICAgICAgIGZlZWQ6IChxdWVyeVRleHQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJxdWVyeS10ZXh0IGZvciBtZW50aW9uOiBcIiArIHF1ZXJ5VGV4dCk7XG4vKlxuICAgICAgICAgICAgICAgICAgICAgICAgaWRtU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5saXN0VXNlcnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZE1hc2s6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzOiBbJ3VzZXJzLnVzZXIuaWQnLCAndXNlcnMudXNlci5kaXNwbGF5X25hbWUnLCAndXNlcnMudXNlci5maXJzdF9uYW1lJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudXNlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlcnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlcnMuZmlsdGVyKHByb2ZpbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGUudXNlcj8udXNlcm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeVRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgcHJvZmlsZS51c2VyPy5maXJzdE5hbWU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnlUZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHByb2ZpbGUudXNlcj8uZGlzcGxheU5hbWU/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnlUZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAocHJvZmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdAJyArIHByb2ZpbGUhLnVzZXIhLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHByb2ZpbGUhLnVzZXIhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyTmFtZVBpcGUudHJhbnNmb3JtKHByb2ZpbGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
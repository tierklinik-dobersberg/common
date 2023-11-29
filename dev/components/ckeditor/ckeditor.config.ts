//import { UserNamePipe } from '@tkd/angular';
import { USER_SERVICE } from '@tkd/angular/connect';
import { inject } from "@angular/core";

export function getCKEditorConfig(): any {
    const idmService = inject(USER_SERVICE);
    //const userNamePipe = inject(UserNamePipe)

    return {
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: (queryText: string) => {
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
    }
}

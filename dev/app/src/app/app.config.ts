import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import * as heroIcons from '@ng-icons/heroicons/outline';
import { provideIcons } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIcons(heroIcons),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(OverlayModule)
  ]
};

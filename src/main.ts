import { bootstrapApplication } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { sparklesOutline } from 'ionicons/icons';
import { appConfig } from './app/app.config';
import { App } from './app/app';

addIcons({ 'sparkles-outline': sparklesOutline });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

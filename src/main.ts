import { bootstrapApplication } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { chevronBack, close, helpCircleOutline, sparklesOutline } from 'ionicons/icons';
import { appConfig } from './app/app.config';
import { App } from './app/app';

addIcons({
  'sparkles-outline': sparklesOutline,
  'chevron-back': chevronBack,
  'help-circle-outline': helpCircleOutline,
  close
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

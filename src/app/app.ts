import { Component, signal, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly appTitle = signal('Outsmart Game');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'sl', 'de']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|sl|de/) ? browserLang : 'en');
  }
}

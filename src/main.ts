import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideStorage } from '@ionic/storage-angular';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

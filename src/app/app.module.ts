// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { AngularFireModule } from '@angular/fire/compat'; // 👈 usa compatibilidad
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent], // NO declares aquí componentes standalone
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule, 
     // 👇 Firebase (API clásica compatible con NgModule)
     AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
  ],
  providers: [  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    { provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}

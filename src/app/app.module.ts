import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {TimingsComponent} from './components/timings/timings.component';
import {DigitsPipe, PrettyDiffPipe, PrettyDurationPipe} from './pipes/digits.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ConfigurationComponent} from './components/configuration/configuration.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DefaultConfigService} from './providers/default-config.service';
import {ImportComponent} from './components/import/import.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimingsComponent,
    DigitsPipe,
    PrettyDurationPipe,
    PrettyDiffPipe,
    ConfigurationComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    DragDropModule,
    MatInputModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, DefaultConfigService],
  bootstrap: [AppComponent],
  entryComponents: [ImportComponent]
})
export class AppModule {
}

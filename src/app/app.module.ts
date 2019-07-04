import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PacientiComponent } from './pacienti/pacienti.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/user.service'
import { AuthInterceptor } from './auth/auth.interceptors';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { loadCldr } from "@syncfusion/ej2-base";

declare var require: any;

registerLocaleData(localeRo, 'ro');
loadCldr(
  require("cldr-data/main/ro/numbers.json"),
  require("cldr-data/main/ro/ca-gregorian.json"),
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/ro/timeZoneNames.json"),
  require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PacientiComponent,
    FirstpageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DatePickerModule,
    FormsModule,
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

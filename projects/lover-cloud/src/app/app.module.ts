import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoverCloudModule } from './lover-cloud/lover-cloud.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './authentication/services/auth.service';
import { NzSpinModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './authentication/services/user.service';
import { LoverService } from './lover-cloud/services/lover.service';
import { AuthInterceptor } from './authentication/services/auth.interceptor';


export const authInterceptor = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoverCloudModule,
    AuthenticationModule,
  ],
  providers: [
    AuthService,
    UserService,
    LoverService,
    authInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

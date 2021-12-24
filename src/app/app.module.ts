import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorProvide } from './auth/interceptors/auth.interceptor';
import { AppComponent } from './index/app.component';
import { ErrorHandlerProvide } from './shared/services/global-error-handler.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [ErrorHandlerProvide, AuthInterceptorProvide],
  bootstrap: [AppComponent],
})
export class AppModule {}

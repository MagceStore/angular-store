import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './components/root/app.component';
import { ErrorHandlerProvide } from './error/global-error-handler.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, HttpClientModule, AuthModule, AppRoutingModule],
  providers: [ErrorHandlerProvide],
  bootstrap: [AppComponent],
})
export class AppModule {}

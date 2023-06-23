import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { NavigationWindowComponent } from './navigation-window/navigation-window.component';
import { ConsoleComponent } from './console/console.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    NavigationWindowComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {EditorComponent} from './editor/editor.component';
import {DevstuffComponent} from './devstuff/devstuff.component';
import {GettingStartedComponent} from './getting-started/getting-started.component';
import {ChartsModule} from 'ng2-charts';
import {StatisticshelpComponent} from './help/statisticshelp/statisticshelp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    DevstuffComponent,
    GettingStartedComponent,
    StatisticshelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

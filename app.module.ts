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
import {HelpComponent} from './help/help.component';
import {FeatureListComponent} from './feature-list/feature-list.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { TutorialsComponent } from './tutorials/tutorials.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    EditorComponent,
    DevstuffComponent,
    GettingStartedComponent,
    StatisticshelpComponent,
    HelpComponent,
    FeatureListComponent,
    TutorialsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

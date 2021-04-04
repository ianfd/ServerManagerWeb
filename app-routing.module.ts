import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {EditorComponent} from './editor/editor.component';
import {DevstuffComponent} from './devstuff/devstuff.component';
import {GettingStartedComponent} from './getting-started/getting-started.component';
import {StatisticshelpComponent} from './help/statisticshelp/statisticshelp.component';
import {HelpComponent} from './help/help.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'dev-stuff', component: DevstuffComponent},
  {path: 'getstarted', component: GettingStartedComponent},
  {path: 'help/stats', component: StatisticshelpComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

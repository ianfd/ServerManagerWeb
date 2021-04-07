import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {EditorComponent} from './editor/editor.component';
import {DevstuffComponent} from './devstuff/devstuff.component';
import {GettingStartedComponent} from './getting-started/getting-started.component';
import {StatisticshelpComponent} from './help/statisticshelp/statisticshelp.component';
import {HelpComponent} from './help/help.component';
import {TutorialsComponent} from './tutorials/tutorials.component';
import {MysqlComponent} from './tuts/install/mysql/mysql.component';
import {PluginComponent} from './tuts/install/plugin/plugin.component';
import {FirstServerComponent} from './tuts/first-server/first-server.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'dev-stuff', component: DevstuffComponent},
  {path: 'getstarted', component: GettingStartedComponent},
  {path: 'help/stats', component: StatisticshelpComponent},
  {path: 'help', component: HelpComponent},
  {path: 'tutorials', component: TutorialsComponent},
  {path: 'tutorials/install/mysql', component: MysqlComponent},
  {path: 'tutorials/install/plugin', component: PluginComponent},
  {path: 'tutorials/first-server', component: FirstServerComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

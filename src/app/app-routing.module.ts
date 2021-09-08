import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCrudsComponent} from "./user-cruds/user-cruds.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '', component: UserCrudsComponent},
  {path: 'user', component: UserCrudsComponent},
  // {path: 'default', component: UserCrudsComponent},
  // {path: 'default', pathMatch: 'full', redirectTo: 'default', component: UserCrudsComponent},
  // {path: 'user', redirectTo: ''},
  // {path: '*', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

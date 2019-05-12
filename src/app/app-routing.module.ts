import {RouterModule, Routes} from '@angular/router';
import {MoviesComponent} from './movies/movies.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'login', component: SigninComponent},
  {path: 'register', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

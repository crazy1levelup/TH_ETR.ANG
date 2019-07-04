import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PacientiComponent } from './pacienti/pacienti.component';
import { AuthGuard } from './auth/auth.guard';
import { Popup } from '@syncfusion/ej2-popups';

const routes: Routes = [
  {
    path: '', component: FirstpageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

    ]
  },
  { path: 'pacienti', component: PacientiComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

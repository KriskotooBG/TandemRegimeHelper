import { Routes } from '@angular/router';
import { SignInSignUpViewComponent } from './views/sign-in-sign-up-view/sign-in-sign-up-view.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';

export const routes: Routes = [
	{path:  '', redirectTo: 'dashboard', pathMatch: 'full'},

	{path: 'dashboard', component: DashboardViewComponent},
	{path: 'sign-up', component: SignInSignUpViewComponent},
	{path: 'sign-in', component: SignInSignUpViewComponent}
];

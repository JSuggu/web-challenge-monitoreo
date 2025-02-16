import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MonitoringLayoutComponent } from './components/layouts/monitoring-layout/monitoring-layout.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {
        path: "auth",
        children: [
            {path: "login",component: LoginComponent},
            {path: "register",component: RegisterComponent}
        ]
    },
    {
        path: 'app', component: MonitoringLayoutComponent, 
        canActivate: [authGuard],
        children: [
            {path: 'plants', component: MonitoringComponent}
        ]
    },
    {path: '**', redirectTo: 'auth/login'}
];

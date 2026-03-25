import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Ejecutados } from './components/pages/ejecutados/ejecutados';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';
import { Informe } from './components/pages/informe/informe';
import { Ordenes } from './components/pages/ordenes/ordenes';

export const routes: Routes = [
{ path: "inicio", component: Home, title: "Inicio" },
{ path: "Ejecutados", component: Ejecutados, title: "Ejecutados" },
{ path: "informe", component: Informe, title: "Informe" },
{ path: "", redirectTo: "/inicio", pathMatch: "full" },
{ path: 'ordenes', loadComponent: () => import('./components/pages/ordenes/ordenes').then(m => m.Ordenes) },
{ path: "**", component: PageNotFound, title: "Error 404" }
];
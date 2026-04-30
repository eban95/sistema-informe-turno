import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Ejecutados } from './components/pages/ejecutados/ejecutados';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';
import { Informe } from './components/pages/informe/informe';
import { Ordenes } from './components/pages/ordenes/ordenes';
import { Estadisticas } from './components/pages/estadisticas/estadisticas';

export const routes: Routes = [
{ path: 'inicio', component: Home, title: 'Inicio' },
{ path: 'Ejecutados', redirectTo: 'ejecutados', pathMatch: 'full' },
{ path: 'ejecutados', component: Ejecutados, title: 'Ejecutados' },
{ path: 'informe', component: Informe, title: 'Informe' },
{ path: 'ordenes', component: Ordenes, title: 'Órdenes' },
{ path: 'estadisticas', component: Estadisticas, title: 'Estadísticas' },
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: '**', component: PageNotFound, title: 'Error 404' }
];
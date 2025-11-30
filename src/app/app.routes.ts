import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { tabsRoutes } from './pages/tabs/tabs.routes';

export const routes: Routes = [
	{
		path: '',
		children: tabsRoutes,
		canActivate: [authGuard]
	},
	{
		path: 'scenario/:id',
		loadComponent: () =>
			import('./pages/lobby/lobby.page').then((m) => m.LobbyPage),
		canActivate: [authGuard]
	},
	{
		path: 'game/:id',
		loadComponent: () =>
			import('./pages/gameplay/gameplay.page').then((m) => m.GameplayPage),
		canActivate: [authGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

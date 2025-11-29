import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const tabsRoutes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'games',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'leaderboard',
        loadComponent: () => import('../leaderboard/leaderboard.page').then(m => m.LeaderboardPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: '/tabs/games',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/games',
    pathMatch: 'full'
  }
];

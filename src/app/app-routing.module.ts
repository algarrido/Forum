import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'hilo',
    loadChildren: () => import('./hilo/hilo.module').then( m => m.HiloPageModule)
  },
  {
    path: 'edit-note-modal',
    loadChildren: () => import('./modals/edit-note-modal/edit-note-modal.module').then( m => m.EditNoteModalPageModule)
  },
   {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HiloPageRoutingModule } from './hilo-routing.module';

import { HiloPage } from './hilo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    HiloPageRoutingModule
  ],
  declarations: [HiloPage]
})
export class HiloPageModule {}

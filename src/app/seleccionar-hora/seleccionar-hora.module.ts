import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarHoraPageRoutingModule } from './seleccionar-hora-routing.module';

import { SeleccionarHoraPage } from './seleccionar-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarHoraPageRoutingModule
  ],
  declarations: [SeleccionarHoraPage]
})
export class SeleccionarHoraPageModule {}

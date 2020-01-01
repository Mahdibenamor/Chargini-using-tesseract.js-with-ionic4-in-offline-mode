import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgProgressModule} from '@ngx-progressbar/core';
import { IonicModule } from '@ionic/angular';
import { RechargePageRoutingModule } from './recharge-routing.module';
import { RechargePage } from './recharge.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgProgressModule,
    RechargePageRoutingModule
  ],
  declarations: [RechargePage],
  providers:[]

})
export class RechargePageModule {}

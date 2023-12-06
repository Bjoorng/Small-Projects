import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavComponent } from '../nav/nav.component';
import { RomeComponent } from './rome/rome.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    RomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route:Router) {}


  chose_operateur(id:number){
      this.startapp(id.toString());
  }
  startapp(id:string){
    this.route.navigate(["recharge"],{  queryParams: {'id':id} })
  }

}

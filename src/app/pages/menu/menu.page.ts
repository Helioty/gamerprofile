import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      title: 'Profile',
      icon: 'person-circle',
      path: '/profile'
    }
  ];

  constructor(private menuCtrl: MenuController) { }

  ngOnInit(): void { }

  setTitle(title: string): void {

  }

}

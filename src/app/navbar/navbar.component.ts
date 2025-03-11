import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuActive: boolean = false;
  activeSubmenu: string = '';
  constructor(private router: Router) {}
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  toggleSubmenu(submenu: string) {
    this.activeSubmenu = this.activeSubmenu === submenu ? '' : submenu;
  }
  navigateTo(path: string) {
    this.isMenuActive = false; // Close the menu after navigating
    this.router.navigate([`/${path}`]); // Navigate to the desired route
  }
}

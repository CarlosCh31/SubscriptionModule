import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
})
export class HomeComponent {

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  currentMonth: number;
  currentYear: number;
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { date: Date, isCurrentMonth: boolean, isToday: boolean }[] = [];

  constructor(private router: Router) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendar();
  }

  successMessage: string | null = null;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.successMessage = localStorage.getItem('successMessage');

    if (this.successMessage) {
      setTimeout(() => {
        localStorage.removeItem('successMessage');
        this.successMessage = null;
      }, 5000);
    }
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    this.calendarDays = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const today = new Date();
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        isCurrentMonth: true,
        isToday: today.getDate() === i && today.getMonth() === this.currentMonth && today.getFullYear() === this.currentYear
      });
    }

    const remainingSlots = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingSlots; i++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDate(date: Date) {
    alert('Selected date: ' + date.toDateString());
  }

  get monthName(): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[this.currentMonth];
  }
}

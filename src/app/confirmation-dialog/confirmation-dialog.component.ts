import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @Input() message!: string;  
  @Output() confirmed = new EventEmitter<boolean>();  
  showDialog: boolean = true;

  confirm(result: boolean) {
    this.confirmed.emit(result); 
  }
  closeModal() {
    this.showDialog = false;
  }

  openModal() {
    this.showDialog = true;
  }
}

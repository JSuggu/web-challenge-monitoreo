import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-card',
  imports: [],
  templateUrl: './alert-card.component.html',
  styleUrl: './alert-card.component.css'
})
export class AlertCardComponent {
  @Input() message!: string;
  @Output() closeAlert = new EventEmitter<void>();

  close(){
    this.closeAlert.emit();
  }
}

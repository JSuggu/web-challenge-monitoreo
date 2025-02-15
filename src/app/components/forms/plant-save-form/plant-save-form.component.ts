import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../services/request/request.service';
import { Plant } from '../../../models/Plant';
import { NgIf } from '@angular/common';
import { AlertCardComponent } from '../../cards/alert-card/alert-card.component';

@Component({
  selector: 'app-plant-save-form',
  imports: [AlertCardComponent, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './plant-save-form.component.html',
  styleUrl: './plant-save-form.component.css'
})
export class PlantFormCardComponent {
    @Input() selectedPlant: Plant | null = null;
    @Output() closeForm = new EventEmitter<void>();
    plantForm!: FormGroup;
    requestService = inject(RequestService);
    alertMessage!: string;
    showAlert: boolean = false;
  
    constructor(){}
    
    ngOnInit(){
      this.plantForm = new FormGroup({
          name: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required)
        });
    }
  
    onSubmit(){
      const token = localStorage.getItem("token");
      this.requestService.postPlant(token, this.plantForm.value).subscribe(plantData => {
        this.requestService.addDefaultSensors(token, plantData.uuid).subscribe(sensorsData => {
          this.alertMessage = "Planta añadida exitosamente";
          this.showAlert = true;
        });
      }, error => {
          this.alertMessage = JSON.parse(JSON.stringify(error));
      });
    }

    close(){
      this.closeForm.emit();
    }
  
    onCloseAlert() {
      this.showAlert = false;
      this.closeForm.emit();
    }
  
    get name() {
      return this.plantForm.get('name');
    }
  
    get country() {
      return this.plantForm.get('country');
    }
}

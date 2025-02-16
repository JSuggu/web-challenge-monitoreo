import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Plant } from '../../../models/Plant';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../services/request/request.service';
import { AlertCardComponent } from '../../cards/alert-card/alert-card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-plant-update-form',
  imports: [AlertCardComponent, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './plant-update-form.component.html',
  styleUrl: './plant-update-form.component.css'
})
export class PlantUpdateFormComponent {
      @Input() selectedPlant!: Plant;
      @Output() closeUpdateForm = new EventEmitter<Plant>();
      plantForm!: FormGroup;
      requestService = inject(RequestService);
      alertMessage!: string;
      showAlert: boolean = false;
      updatedPlant!: Plant;
    
      constructor(){}
      
      ngOnInit(){
        
        this.plantForm = new FormGroup({
            name: new FormControl(this.selectedPlant.name, Validators.required),
            country: new FormControl(this.selectedPlant.country, Validators.required)
          });
      }
    
      onSubmit(){
        const token = localStorage.getItem("token");
        this.requestService.updatePlant(token, this.plantForm.value, this.selectedPlant.uuid).subscribe(plantData => {
          this.alertMessage = "Planta actualizada exitosamente";
          this.updatedPlant = plantData;
          this.showAlert = true;
        }, errorResponse => {
            this.alertMessage = errorResponse.error.message;
            this.showAlert = true;
        });
      }
  
      close(){
        this.plantForm.reset({name: this.selectedPlant.name, country: this.selectedPlant.country});
        this.closeUpdateForm.emit(undefined);
      }
    
      onCloseAlert() {
        this.showAlert = false;
        this.closeUpdateForm.emit(this.updatedPlant);
      }
    
      get name() {
        return this.plantForm.get('name');
      }
    
      get country() {
        return this.plantForm.get('country');
      }
}

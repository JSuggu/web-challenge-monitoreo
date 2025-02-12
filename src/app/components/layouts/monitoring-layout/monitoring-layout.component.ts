import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-monitoring-layout',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './monitoring-layout.component.html',
  styleUrl: './monitoring-layout.component.css'
})
export class MonitoringLayoutComponent {

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MonitoringComponent } from '../../monitoring/monitoring.component';

@Component({
  selector: 'app-monitoring-layout',
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './monitoring-layout.component.html',
  styleUrl: './monitoring-layout.component.css'
})
export class MonitoringLayoutComponent {

}

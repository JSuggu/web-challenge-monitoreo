import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() currentRoute!: string;
  readonly loginData: authData;
  readonly registerData: authData;
  data: authData;

  constructor(){
    this.loginData = {
      title: "Iniciar Sesion",
      description: "Nos alegra tenerte de vuelta y estamos listos para atender tus necesidades. Inicia sesión y continúa aprovechando al máximo nuestra plataforma."
    }
    this.registerData = {
      title: "Registrarse",
      description: "¡Bienvenido! Estamos encantados de que quieras unirte a nuestra plataforma. Regístrate y comienza a disfrutar de todas las ventajas que ofrecemos. No pierdas la oportunidad de ser parte de nuestra comunidad"
    }

    this.data = this.loginData;
  }

  ngOnInit(){
      this.data = this.currentRoute === 'login'? this.loginData : this.registerData;
  }
}

interface authData {
  title: string,
  description: string
}

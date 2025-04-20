import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-Ecommerce';
  

  ngOnInit() {
    this.solicitarPermisoNotificacion();
  }
  
  solicitarPermisoNotificacion() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permiso) => {
        if (permiso === 'granted') {
          console.log('✅ Permiso de notificación otorgado');
        } else {
          console.warn('⚠️ Permiso de notificación denegado');
        }
      });
    }
  }
  
}

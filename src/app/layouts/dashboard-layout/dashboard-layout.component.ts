import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  sidebarVisible = true;
  isMobile = false;
  

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    this.sidebarVisible = !this.isMobile; // 🔁 visibilidad controlada
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

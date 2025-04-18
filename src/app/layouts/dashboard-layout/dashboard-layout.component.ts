import { Component } from '@angular/core';
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
  sidebarVisible = false;
  isMobile = false;

  ngOnInit() {
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
  }

  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) this.sidebarVisible = true; // visible en escritorio
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

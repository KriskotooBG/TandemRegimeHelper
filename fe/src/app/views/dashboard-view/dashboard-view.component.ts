import { Component } from '@angular/core';
import { MonthViewComponent } from './components/month-view/month-view.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [ MonthViewComponent ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {

}

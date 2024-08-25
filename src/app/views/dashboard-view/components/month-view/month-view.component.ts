import { Component } from '@angular/core';
import { TimesPipe } from '../../../../pipes/times.pipe';

@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [ TimesPipe ],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss'
})
export class MonthViewComponent {
	static readonly WEEKDAY_ORDER_ARRAY: number[] = [6, 0, 1, 2, 3, 4, 5];
	static readonly currentLocalDateTime = new Date();

	selectedYear: number = MonthViewComponent.currentLocalDateTime.getFullYear();
	selectedMonth: number = MonthViewComponent.currentLocalDateTime.getMonth();

	countStartFillerDays = 0;
	startFillerDay: number = 1;
	countDaysMonth: number = 30;

	private workingDateObject: Date = new Date();



	constructor(){
		this.renderCalendarCells()
	}


	isCurrentDay(day: number): boolean {
		return  MonthViewComponent.currentLocalDateTime.getDay() == day &&
				MonthViewComponent.currentLocalDateTime.getMonth() == this.workingDateObject.getMonth() &&
				MonthViewComponent.currentLocalDateTime.getFullYear() == this.workingDateObject.getFullYear()
	}

	setSelectedMonth(ev: any){
		this.selectedMonth = ev.target.value - 1;
		this.renderCalendarCells();
	}

	renderCalendarCells(){
		this.workingDateObject.setFullYear(this.selectedYear, this.selectedMonth, 1);

		this.countStartFillerDays = MonthViewComponent.WEEKDAY_ORDER_ARRAY[this.workingDateObject.getDay()];

		this.workingDateObject.setMonth(this.selectedMonth + 1, 0);
		this.countDaysMonth = this.workingDateObject.getDate();

		this.workingDateObject.setDate(0);
		this.startFillerDay = (this.workingDateObject.getDate() - (this.countStartFillerDays - 1));
	}
}

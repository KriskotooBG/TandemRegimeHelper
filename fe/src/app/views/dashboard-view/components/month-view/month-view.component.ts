import { Component } from '@angular/core';
import { TimesPipe } from '../../../../pipes/times.pipe';
import { CommonModule } from '@angular/common';

export enum CellType{
	previousMonth,
	currentMonth,
	nextMonth,
}

export class CalendarCell{
	constructor(
		public day: number,
		public month: number,
		public year: number,
		public type: CellType,
		public isToday: Boolean
	){}

	getId(){
		return `${this.day < 10 ? `0${this.day}` : this.day}${this.month < 10 ? `0${this.month}` : this.month}${this.year}`;
	}
}


@Component({
  selector: 'app-month-view',
  standalone: true,
  imports: [ TimesPipe, CommonModule ],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss'
})
export class MonthViewComponent {
	public CellType = CellType;

	static readonly WEEKDAY_ORDER_ARRAY: number[] = [6, 0, 1, 2, 3, 4, 5];
	static readonly currentLocalDateTime = new Date();

	selectedYear: number = MonthViewComponent.currentLocalDateTime.getFullYear();
	selectedMonthIndex: number = MonthViewComponent.currentLocalDateTime.getMonth();

	cellData:CalendarCell[] = []

	private workingDateObject: Date = new Date();



	constructor(){
		this.calculateCalendarDays()
	}


	setSelectedMonth(ev: any){
		this.selectedMonthIndex = ev.target.value - 1;
		this.calculateCalendarDays()
	}


	private calculateCalendarDays(){
		this.workingDateObject.setFullYear(this.selectedYear, this.selectedMonthIndex, 1);

		//Get the weekday index of the first day in the selected month, and grab a value from the map which
		//represents how many days we need to render in the beginning as the "previous month"
		const countStartFillerDays = MonthViewComponent.WEEKDAY_ORDER_ARRAY[this.workingDateObject.getDay()];

		//Set the month to the next one, but the day to "0" which will actually internally set it to this
		//month's last day.
		this.workingDateObject.setMonth(this.selectedMonthIndex + 1, 0);
		this.cellData = Array.from({length: this.workingDateObject.getDate()}, (_, i) => {
			return new CalendarCell(i + 1, this.selectedMonthIndex + 1, this.selectedYear, CellType.currentMonth, this.isCurrentDay(i + 1, this.selectedMonthIndex, this.selectedYear))
		});

		//Set the day to "0", which will give us the last day of the previous month.
		this.workingDateObject.setDate(0);
		const startFillerDay = (this.workingDateObject.getDate() - (countStartFillerDays - 1));
		const previousMonthIndex = this.workingDateObject.getMonth();
		const prevMonthYear = this.workingDateObject.getFullYear();
		this.cellData.unshift(...Array.from({length: countStartFillerDays}, (_, i) => {
			return new CalendarCell(startFillerDay + i, previousMonthIndex + 1, prevMonthYear, CellType.previousMonth, this.isCurrentDay(startFillerDay + i, previousMonthIndex, prevMonthYear))
		}));

		
		const countVisibleNextMonthDays = 7 - (this.cellData.length % 7);
		if(countVisibleNextMonthDays < 7){
			this.workingDateObject.setMonth(this.selectedMonthIndex + 1, 1);
			const nextMonthIndex = this.workingDateObject.getMonth();
			const nextMonthYear = this.workingDateObject.getFullYear();
			this.cellData.push(...Array.from({length: countVisibleNextMonthDays}, (_, i) => {
				return new CalendarCell(i + 1, nextMonthIndex + 1, nextMonthYear, CellType.nextMonth, this.isCurrentDay(i + 1, nextMonthIndex, nextMonthYear))
			}));
		}
		
		//reset the state
		this.workingDateObject.setFullYear(this.selectedYear, this.selectedMonthIndex, 1);
	}


	private isCurrentDay(day: number, monthIndex: number, year: number): boolean {
		return  MonthViewComponent.currentLocalDateTime.getDate() == day &&
				MonthViewComponent.currentLocalDateTime.getMonth() == monthIndex &&
				MonthViewComponent.currentLocalDateTime.getFullYear() == year
	}
}

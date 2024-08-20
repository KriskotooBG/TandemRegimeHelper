import { Component, Input, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { SidebarContentComponent } from '../sidebar-content/sidebar-content.component';

@Component({
	selector: 'app-shell',
	standalone: true,
	imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, SidebarContentComponent],
	templateUrl: './app-shell.component.html',
	styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
	@ViewChild('sideNavMenu') sideMenu!: MatSidenav;


	@Input()
	showAppTitleBar: boolean = true;

	@Input()
	showFab: boolean = true;

	@Input()
	fabOnClick: Function  = () => {}



	closeSidebar(){
		this.sideMenu.close()
	}

	openSidebar(){
		this.sideMenu.open()
	}
}

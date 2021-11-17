import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter();
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription$!: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription$ = this.authService.authChange$.subscribe( (authStatus) => {
      this.isAuth = authStatus;
    } );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  logout() {
    this.closeSidenav.emit();
    this.authService.logout();
  }

  ngOnDestroy() {

    this.authSubscription$.unsubscribe();
  }
}

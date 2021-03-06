import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

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

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {

    this.authSubscription$.unsubscribe();
  }
}

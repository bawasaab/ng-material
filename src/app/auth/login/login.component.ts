import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  loginForm!: FormGroup;
  // isLoading = false;
  public isLoading$!: Observable<boolean>;
  private loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{
      ui: fromApp.State
    }>
  ) { }

  ngOnInit(): void {

    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe( (isLoading) => {
    //   this.isLoading = isLoading;
    // } );

    this.isLoading$ = this.store.pipe(map( (state: { ui: { isLoading: boolean; }; }) => state.ui.isLoading ));
    // console.log('this.isLoading$', this.isLoading$);
    this.loadingSubs = this.isLoading$.subscribe((state) => {
      this.isLoading = state;
    })
    this.store.subscribe( (data) => { console.log('data',data) } );
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {

    console.log(this.loginForm.value);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {

    if( this.loadingSubs ) {
      this.loadingSubs.unsubscribe();
    }
  }
}

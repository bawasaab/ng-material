import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( (isLoading) => {
      this.isLoading = isLoading;
    } );
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

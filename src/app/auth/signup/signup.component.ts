import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate!: Date;
  loadingSubs!: Subscription;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {

    this.maxDate = new Date();
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  }

  onSubmit( form: NgForm ) {

    // console.log('form', form);
    // console.log('form.value', form.value);

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe( (isLoading) => { this.isLoading = isLoading } );

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {

    if( this.loadingSubs ) {
      this.loadingSubs.unsubscribe();
    }
  }

}

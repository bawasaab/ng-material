import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {

    console.log(this.loginForm.value);
    this.authService.registerUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}

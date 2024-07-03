import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User, LoginDetails } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  registerSuccessMessage: string | null = null;  // Add property for success message
  loginSuccessMessage: string | null = null;  // Add property for success message

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');

    if (signUpBtn && signInBtn && container) {
      signUpBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
      signInBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.userService.register(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.registerSuccessMessage = 'Registration successful!';  // Set success message
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginDetails: LoginDetails = this.loginForm.value;
      this.userService.login(loginDetails).subscribe(
        response => {
          console.log('User logged in successfully', response);
          this.loginSuccessMessage = 'Login successful!';  // Set success message
        },
        error => {
          console.error('Error logging in', error);
        }
      );
    }
  }

  get registerControls() {
    return this.registerForm.controls;
  }

  get loginControls() {
    return this.loginForm.controls;
  }
}

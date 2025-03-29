import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    mobileNumber: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm): void {
    if (form.valid) {
      this.authService.register(this.user).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/auth/sign-in']);
        },
        error: (error: any) => {
          if (error.status === 409) {
            this.errorMessage = 'User already exists with this email.';
          }else if (error.status === 500) {
            this.errorMessage = 'Server error. Please try again later.';
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }  
}

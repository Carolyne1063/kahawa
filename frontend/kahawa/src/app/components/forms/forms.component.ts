import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})



export class FormsComponent implements AfterViewInit {

  ngAfterViewInit() {
    const container = document.getElementById('container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');

    if (container && signUpBtn && signInBtn) {
      signUpBtn.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signInBtn.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }
}



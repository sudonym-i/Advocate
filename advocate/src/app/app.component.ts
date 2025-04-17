import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openLoginModal() {
    this.dialog.open(LoginModalComponent, {
      width: '300px',
    });
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'advocate';
}

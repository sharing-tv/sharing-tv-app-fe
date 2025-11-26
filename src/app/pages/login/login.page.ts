
// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const { email, password } = this.form.value;

    this.auth.login(email, password).subscribe({
      next: async () => {
        this.isSubmitting = false;
        const t = await this.toastCtrl.create({
          message: 'Login effettuato',
          duration: 2000,
          color: 'success'
        });
        await t.present();
        this.router.navigateByUrl('/admin/palinsesto');
      },
      error: async (err) => {
        this.isSubmitting = false;
        console.error('Errore login', err);
        const msg = err.error?.error || 'Credenziali non valide';
        const t = await this.toastCtrl.create({
          message: msg,
          duration: 2500,
          color: 'danger'
        });
        await t.present();
      }
    });
  }
}


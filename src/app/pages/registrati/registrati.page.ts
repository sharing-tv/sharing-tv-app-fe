
// src/app/pages/registrati/registrati.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.page.html',
  styleUrls: ['./registrati.page.scss'],
})
export class RegistratiPage {

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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const { email, password } = this.form.value;

    this.auth.register(email, password).subscribe({
      next: async () => {
        this.isSubmitting = false;
        const t = await this.toastCtrl.create({
          message: 'Registrazione completata. Ora puoi effettuare il login.',
          duration: 2000,
          color: 'success'
        });
        await t.present();
        this.router.navigateByUrl('/login');
      },
      error: async (err) => {
        this.isSubmitting = false;
        console.error('Errore registrazione', err);
        const msg = err.error?.error || 'Errore durante la registrazione';
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


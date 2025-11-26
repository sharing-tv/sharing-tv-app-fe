
# src/app/components/mini-live-vod/mini-live-vod.component.ts
✔ autoplay parta subito
✔ sia MUTED (obbligatorio per autoplay mobile)
✔ prenda nowPlaying.title
✔ aggiorni ogni minuto
✔ usi Hls.js se necessario
✔ riconosca correttamente quale video è in onda


# src/app/services/auth.service.ts
    AuthService con chiamata al backend
    interface
    register
    login
    logout
    getToken
    isLoggedIn

# src/app/guards/auth.guard.ts
    CanActivate
    private auth: AuthService
    private router: Router

# src/app/pages/registrati/registrati.module.ts
    ReactiveFormsModule
    FormsModule
    RegistratiPageRoutingModule

# src/app/pages/registrati/registrati.page.ts
    FormBuilder
    AuthService
    Router
    ToastController
    Validators
    onSubmit

# src/app/pages/login/login.module.ts
    ReactiveFormsModule
    LoginPageRoutingModule

# src/app/pages/login/login.page.ts
    FormBuilder
    AuthService
    Router
    ToastController
    Validators
    onSubmit


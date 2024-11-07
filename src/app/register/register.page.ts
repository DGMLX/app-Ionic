import { Component, inject, OnInit } from '@angular/core'; 
import { Router } from "@angular/router";
import { AuthenticationService } from '../firebase/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  authenticationService: AuthenticationService = inject(AuthenticationService);

  datosForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    },
    { validators: this.passwordsCoinciden } 
  );

  cargando: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {''}

 
  passwordsCoinciden(form: FormGroup) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password === rePassword ? null : { passwordsNoCoinciden: true };
  }

  async registrarse() {
    this.cargando = true;
    console.log('datosForm -> ', this.datosForm);

    if (this.datosForm.valid) {
      const data = this.datosForm.value;
      console.log('valid ->', data);

      try {
        const user = await this.authenticationService.createUser(data.email as string, data.password as string);
        console.log('user -> ', user);
        this.router.navigate(['/home-cliente']);
      } catch (error) {
        console.log('error al registrarse -> ', error);
      }
    } else if (this.datosForm.hasError('passwordsNoCoinciden')) {
      console.log('Las contraseñas no coinciden');
    }

    this.cargando = false;
  }

  onLoginButtonPressed() {
    this.router.navigate(['/login']);
  }
}

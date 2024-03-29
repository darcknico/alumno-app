import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { PasswordValidator } from 'src/app/_validators/password.validator';
import { LoadingProvider } from 'src/app/providers/loading.provider';
import { AlertProvider } from 'src/app/providers/alert.provider';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {
  @ViewChild('a') a;
  
  passwordType:string = 'password';
  passwordShown:boolean=false;
  passwordIcon:string = 'eye-off';

  passwordType2:string = 'password';
  passwordShown2:boolean=false;
  passwordIcon2:string = 'eye-off';

  passwordType3:string = 'password';
  passwordShown3:boolean=false;
  passwordIcon3:string = 'eye-off';

  formulario:FormGroup;
  password:AbstractControl;
  n_password:AbstractControl;
  c_password:AbstractControl;


  constructor(
    public formbuilder:FormBuilder,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    public usuarioService:UsuarioService,
    private modalCtrl: ModalController,
    ) {
    this.formulario=formbuilder.group({
      password:['',Validators.required],
      n_password:['',[Validators.required,PasswordValidator.strong,Validators.minLength(6)]],
      c_password:['',[Validators.required,PasswordValidator.strong,Validators.minLength(6)]],
    },{
      validator : this.checkPasswords,
    });
    this.password=this.f.password;
    this.n_password=this.f.n_password;
    this.c_password=this.f.c_password;

  }

  get f(){
    return this.formulario.controls;
  }

  ngOnInit() {
    this.a.setFocus();
  }

  mostrarContrasenya(int:number){
    if(int == 1){
      if(this.passwordShown){
        this.passwordShown=false;
        this.passwordType='password';
        this.passwordIcon='eye-off';
      }else{
        this.passwordShown=true;
        this.passwordType='text';
        this.passwordIcon='eye';
      }
    }else if(int == 2){

      if(this.passwordShown2){
        this.passwordShown2=false;
        this.passwordType2='password';
        this.passwordIcon2='eye-off';
      }else{
        this.passwordShown2=true;
        this.passwordType2='text';
        this.passwordIcon2='eye';
      }
    } else {
      if(this.passwordShown3){
        this.passwordShown3=false;
        this.passwordType3='password';
        this.passwordIcon3='eye-off';
      }else{
        this.passwordShown3=true;
        this.passwordType3='text';
        this.passwordIcon3='eye';
      }
    }
  }

  continuar(){
    if(!this.formulario.valid){
      return;
    }

    let password = this.f.password.value;
    let n_password = this.f.n_password.value;
    let c_password = this.f.c_password.value;
    this.loading.present();
    this.usuarioService.password(password, n_password,c_password).subscribe(response=>{
      this.loading.dismiss();
      this.alert.present(
        'Mensaje',
        null,
        response.mensaje,
        ['OK']
      );
      this.cerrar();
    },(error)=>{
      this.loading.dismiss();
      this.alert.present(
        'Error',
        null,
        error.error.error,
        ['OK']
      );
    });
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  checkPasswords(group: FormGroup) {
    let n_password = group.controls.n_password.value;
    let c_password = group.controls.c_password.value;

    return n_password === c_password ? null : { notSame: true }     
  }

  cerrar(){
    this.modalCtrl.dismiss(true);
  }
}

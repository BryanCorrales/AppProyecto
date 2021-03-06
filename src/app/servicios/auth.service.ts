import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import{AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

interface usuarioss{
  uid: string,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private AFauth: AngularFireAuth, private router : Router, private db :AngularFirestore) { }
  //servicio de login 
  login(usuario:string, password:string){
      //retorna promesa del usuario.
    return new Promise((resolve, rejected)=>{
      //Logueo de usuario con email y password 
      this.AFauth.signInWithEmailAndPassword(usuario, password).then( user=>{
        //Verificacion de cuenta verificada por email.
        this.AFauth.onAuthStateChanged(function(userv){
          var emailVerificado= userv.emailVerified;
          console.log(userv.uid);
          if(emailVerificado==true){
            resolve(user)
            console.log("Email verificado");
          }else{
            console.log("Email no verificado ");
          }
        })
      }).catch(err=> rejected(err));
    })
    
  }
  //funcion para obtener nombre de usuario.
  obtenernombreUsuario(uid: string){
    return this.db.collection('users').doc(uid).snapshotChanges();
  }
  
//Funcion para el registro de token 
  guardarToken(ui: string, tokenr: string){
    this.db.collection('users').doc(ui).update({token: tokenr});
  }
  //Funcion para update el token en caso de que el usuario haya cambiado de equipo
  updateToken(tokenr: string){
    this.isAuth().subscribe(user=>{
      this.obtenernombreUsuario(user.uid).subscribe(usa =>{
        const data2 : usuarioss = usa.payload.data() as usuarioss;
        var token= data2.token;
        var uid= data2.uid;
        console.log("Este es el token :"+ token);
        if(token==null){
          this.guardarToken(uid,tokenr);
        }else{
          if(tokenr!=token){
            console.log("cambio de equipo");
            this.db.collection('users').doc(user.uid).update({token: tokenr});
          }
        }
        
      })
     
     
    });
  }

  logout(){
    this.AFauth.signOut().then(auth=>{
      this.router.navigate(['/home']);
    })
  }
  //registrar Chat
  registrarChat(nombre:string, detalle: string, img:string){
    this.isAuth().subscribe(user=>{
      var userid= user.uid;
      this.db.collection('chats').add({
        nombre: nombre,
        descripcion: detalle,
        img:img,
        users:{
          userr: userid
        }
    })
    
    })
  }

  registrarUsu(email: string, pass: string){
    return new Promise((resolve, reject)=>{
      this.AFauth.createUserWithEmailAndPassword(email,pass).then(res=>{
        console.log(res.user.uid);
        const uid= res.user.uid;
        this.db.collection('users').doc(res.user.uid).set({
          uid: uid,
          correo: email
        })
        this.AFauth.onAuthStateChanged(function(userv){
          var emailVerificado= userv.emailVerified;
          if(emailVerificado==true){
            console.log(userv.uid);
            resolve(res);
            console.log("Email verificado");
          }else{
            console.log("Email no verificado");
            userv.sendEmailVerification().then(function(){
              console.log("email enviado al correo");
            });
          }
        })
        
      }).catch(err=>reject(err));
    })
    
  }
  
  verificacionDatos(){
    return new Promise((resolve)=>{
        this.AFauth.onAuthStateChanged(function(userv){
          var nameUser= userv.displayName;
          var photourl = userv.photoURL;
          if(nameUser!=null && photourl!= null){
            resolve(userv);
          }
        });
      });
    
  }

  resetPasswordInit(email: string) { 
    return this.AFauth.sendPasswordResetEmail(
      email); 
    } 
  isAuth(){
    return this.AFauth.authState.pipe(map(auth=>auth));
  }



}

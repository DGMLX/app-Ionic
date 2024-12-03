import { Injectable } from "@angular/core";
import { SessionManager } from "src/managers/sessionManager";
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { FirebaseStorageService } from 'src/managers/storage-service';

@Injectable({
    providedIn: 'root',
  })

export class ActualizacionImagenUseCase{

    userId:string

    constructor(
        private authService:SessionManager,
        // private db: AngularFireDatabase,
        // private firebaseStorageService: FirebaseStorageService
    ){}


    async actualizarImgUser(imageUrl:string):Promise<{success:boolean,message:string}>{
        try {
            this.authService.getProfile().then(async user=>{
                this.userId=user?.uid
                console.log(this.userId)
                if(this.userId){
                    const path = `Users/${this.userId}/profile-image.jpg`;
                    console.log(path)

                    // // Sube la imagen a Firebase Storage y obtén la URL de la imagen subida
                    // const downloadURL = await this.firebaseStorageService.uploadFile(imageUrl, path, 'profile-image.jpg');

                    // // Actualiza el nodo del usuario en Realtime Database con la nueva URL de la imagen
                    // await this.db.object(`users/${uid}`).update({ photoURL: downloadURL });

                    // // Actualiza el campo photoURL del usuario en StorageService
                    // user.photoURL = downloadURL;
                    // await this.storageService.set('user', user);

                    // // Guarda la URL de la imagen también en el StorageService bajo la clave "UserPhotoURL"
                    // await this.storageService.set('UserPhotoURL', downloadURL);
                    return { success: true, message: 'Imagen de usuario actualizada con éxito.' };
                }else{
                    return { success: false, message: 'No se encontró el UID del usuario.' };
                }
            })
        
            
        } catch(error) {
            return { success: false, message: `Error al subir la imagen: ${error.message}` };  
        }
    }

}
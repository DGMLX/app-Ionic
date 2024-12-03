import { Injectable } from "@angular/core";
import { SessionManager } from "src/managers/sessionManager";
import { StorageImgService } from "src/managers/storageImgService";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from "src/managers/StorageService";
// import { FirebaseStorageService } from 'src/managers/storage-service';

@Injectable({
    providedIn: 'root',
  })

export class ActualizacionImagenUseCase{

    userId:string
    user:any

    constructor(
        private authService:SessionManager,
        private storageImgService : StorageImgService,
        private db: AngularFireDatabase,
        private storageService: StorageService
    ){}


    async actualizarImgUser(imageUrl:string):Promise<{success:boolean,message:string}>{
        try {
            this.authService.getProfile().then(async user=>{
                this.userId=user?.uid
                this.user=user
                console.log(this.userId)
                if(this.userId){
                    const path = `Users/${this.userId}/profile-image.jpg`;
                    console.log(path)

                    
                    const downloadURL = await this.storageImgService.cargarFile(imageUrl, path, 'profile-image.jpg');

                    
                    await this.db.object(`users/${this.userId}`).update({ photoURL: downloadURL });



                    // // Actualiza el campo photoURL del usuario en StorageService
                    this.user.photoURL = downloadURL;
                    await this.storageService.set('user', user);

                    // // Guarda la URL de la imagen también en el StorageService bajo la clave "UserPhotoURL"
                    await this.storageService.set('UserPhotoURL', downloadURL);
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
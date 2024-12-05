import { Injectable } from "@angular/core";
import { SessionManager } from "src/managers/sessionManager";
import { StorageImgService } from "src/managers/storageImgService";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from "src/managers/StorageService";

@Injectable({
    providedIn: 'root',
})

export class ActualizacionImagenUseCase {

    userId: string;
    user: any;

    constructor(
        private authService: SessionManager,
        private storageImgService: StorageImgService,
        private firestore: AngularFirestore,
        private storageService: StorageService
    ) {}

    async actualizarImgUser(imageUrl: string): Promise<{ success: boolean, message: string }> {
        try {
            const user = await this.authService.getProfile();
            this.userId = user?.uid;
            this.user = user;
            console.log(this.userId);
            if (this.userId) {
                // Obtener la URL de la imagen anterior
                let previousImageUrl: string | null = null;
                try {
                    previousImageUrl = await this.storageImgService.getFile(this.userId);
                } catch (error) {
                    console.warn('No se encontró el documento del usuario, se creará uno nuevo.');
                }

                // Subir la nueva imagen
                const downloadURL = await this.storageImgService.cargarFile(imageUrl, this.userId);
                console.log('Nueva URL de la imagen:', downloadURL);

                // Actualizar el perfil del usuario en Firestore
                await this.firestore.doc(`users/${this.userId}`).set({ imageUrl: downloadURL }, { merge: true });
                console.log('URL de la imagen actualizada en Firestore:', downloadURL);

                // Actualizar el perfil del usuario en el almacenamiento local
                this.user.photoURL = downloadURL;
                await this.storageService.set('user', this.user);
                await this.storageService.set('UserPhotoURL', downloadURL);

                // Eliminar la imagen anterior si existe
                if (previousImageUrl) {
                    await this.storageImgService.deleteFile(this.userId);
                }

                return { success: true, message: 'Imagen de usuario actualizada con éxito.' };
            } else {
                return { success: false, message: 'No se encontró el UID del usuario.' };
            }
        } catch (error) {
            console.error('Error al actualizar la imagen:', error);
            return { success: false, message: `Error al subir la imagen: ${error.message}` };
        }
    }
}
import { Injectable } from "@angular/core";
import { SessionManager } from "./sessionManager";
import { addDoc, collection, Firestore, query, where, collectionData, doc, docData, updateDoc, deleteDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export class Reserva {
    id?: string;
    userId: string;
    fecha: string;
    servicio: string;
    hora: string;

    constructor(userId: string, fecha: string, servicio: string, hora: string) {
        this.userId = userId;
        this.fecha = fecha;
        this.hora = hora;
        this.servicio = servicio;
    }
}

@Injectable({
    providedIn: "root"
})
export class ReservasService {

    constructor(private authService: SessionManager, private firestore: Firestore) {}

    async agregarReserva(reserva: Reserva) {
        const user = await this.authService.getProfile();
        reserva.userId = user!.uid;
        const reservaRef = collection(this.firestore, "reservas");
        return addDoc(reservaRef, reserva);
    }

    async obtenerReserva(): Promise<Observable<Reserva[]>> {
        const user = await this.authService.getProfile();
        const reservaRef = collection(this.firestore, "reservas");
        const refquery = query(reservaRef, where("userId", "==", user!.uid));
        return collectionData(refquery, { idField: "id" }) as Observable<Reserva[]>;
    }

    obtenerReservaId(id: any): Observable<Reserva> {
        const reservaRef = doc(this.firestore, `reservas/${id}`);
        return docData(reservaRef, { idField: 'id' }) as Observable<Reserva>;
    }

    actualizarReserva(reserva: Reserva) {
        const reservaRef = doc(this.firestore, `reservas/${reserva.id}`);
        return updateDoc(reservaRef, { fecha: reserva.fecha, hora: reserva.hora });
    }

    eliminarReserva(id: any) {
        const reservaRef = doc(this.firestore, `reservas/${id}`);
        return deleteDoc(reservaRef);
    }
}
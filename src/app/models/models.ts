import { ModelsAuth } from "./auth.models";
import { ModelsReserva } from "./reserva.models";

export namespace Models{
    export import Auth = ModelsAuth;
    export import Reserva = ModelsReserva;
}
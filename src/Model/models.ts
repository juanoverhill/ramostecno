
export class Equipo {
    id?: string;
    descripcion?: string;
    marca_id?: string;
    marcaRef?: firebase.firestore.DocumentReference;
    estado?: string;
    imagen?: string;
    imagenRef?: string;
    orden?: number;
}

export class Marca {
    id?: string;
    descripcion?: string;
    inactivo?: boolean;
}


export class Reparacion {
    id?: string;
    descripcion?: string;
    categoria_id?: string;
    categoriaRef?: firebase.firestore.DocumentReference;
    terminos?: string;
    accion?: string;
    orden?: number;
}

export class PrecioReparacion {
    id?: string;
    equipo_id?: string;
    equipoRef?: firebase.firestore.DocumentReference;
    reparacion_id?: string;
    reparacionRef?: firebase.firestore.DocumentReference;
    valor?: number;
    valor_efectivo?: number;
    categoria_id?: string;
}

export class Usuario {
    id?: string;
    email?: string;
    token?: string;
}

export class Turno {
    id?: string;
    usuario_id?: string;
    nombre_usuario?: string;
    equipoRef?: firebase.firestore.DocumentReference;
    equipo_id?: string;
    color?: string;
    color_id?: string;
    estado_reparacion_id?: string;
    fecha_reparacion?: string;
    hora_reparacion?: number;
    observacion?: string;
    reparacion_id?: string;
    reparacionRef?: firebase.firestore.DocumentReference;
    valor_efectivo?: string;
    valor?: string;
    email?: string;
    telefono?: string;
}

export class Color {
    id?: string;
    color?: string;
    equipoRef?: firebase.firestore.DocumentReference;
    equipo_id?: string;
}

export class Ticket {
    id?: string;
    n_control?: number;
    turno_id?: string;
    contacto?: string;
    imei?: string;
    clave?: string;
    patron?: boolean;
    importe?: string;
    simCard?: boolean;
    bandejaSIM?: boolean;
    tarjetaSD: boolean;
    bateria?: boolean;
    carga?: boolean;
    tapa?: boolean;
    bluetooth?: boolean;
    wifi?: boolean;
    cap?: boolean;
    auricular?: boolean;
    microfono?: boolean;
    altavoz?: boolean;
    camTrasera?: boolean;
    camFrontal?: boolean;
    teclado?: boolean;
    botonON?: boolean;
}

export class Fecha {
    id?: string;
    fecha?: string;
}

export class ParametroAnulacion {
    id?: string;
    dias_anulados?: number;
    dias_laborables?: string;
    empresa?: string;
    suma_n_viernes?: string;
    trabaja_feriados?: string;
}

export class HoraDisponible {
    id?: string;
    empresa?; string;
    horas_trabajo?: string;
}

export class CategoriaReparacion {
    id?: string;
    descripcion?: string;
    orden?: number;
}

export class Colores {
    id?: string;
    descripcion?: string;
}

export class EstadoReparacion {
    id?: string;
    descripcion_estado?: string;
    templateID?: string;
    orden?: number;
}

export class ChatRoom {
    id?: string;
    mensaje?: string;
    leido?: boolean;
    time?: Date;
    usuario_id?: string;
    empresa?: string;
    sender?: boolean;
    sender_id?: string;
    nombreUsuario?: string;
    email?: string;
}

export class ListaChat {
    usuario_id?: string;
    user?: string;
    orderID?: string;
    email?: string;
}

export class ImagenReparacion {
    reparacion_id?: string;
    imagen_URL?: string;
    nombreImagen?: string;
}

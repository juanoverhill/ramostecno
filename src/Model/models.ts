export class Equipo {
    id?: string;
    descripcion?: string;
    marca_id?: string;
    marcaRef?: firebase.firestore.DocumentReference;
}

export class Marca {
    id?: string;
    descripcion?: string;
}

export class Reparacion {
    id?: string;
    descripcion?: string;
    categoria_id?: string;
    categoriaRef?: firebase.firestore.DocumentReference;
    terminos?: string;
}

export class PrecioReparacion {
    id?: string;
    equipo_id?: string;
    equipoRef?: firebase.firestore.DocumentReference;
    reparacion_id?: string;
    reparacionRef?: firebase.firestore.DocumentReference;
    valor?: number;
    valor_efectivo?: number;
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
    estado_reparacion_id?: string;
    fecha_reparacion?: string;
    hora_reparacion?: number;
    observacion?: string;
    reparacion_id?: string;
    reparacionRef?: firebase.firestore.DocumentReference;
    valor_efectivo?: string;
    valor?: string;
}

export class Color {
    id?: string;
    color?: string;
    equipoRef?: firebase.firestore.DocumentReference;
    equipo_id?: string;
}

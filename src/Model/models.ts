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

export class usuario {
    id?: string;
    email?: string;
    token?:string;
}

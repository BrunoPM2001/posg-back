export interface Curso {
  codigo: string;
  idioma_id: number;
  programa_id: number;
  nivel_id: number;
  horario_id: number;
  mes: number;
  año: number;
  modalidad: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  seccion?: string;
}

export interface Horario {
  hora_inicio: string;
  hora_fin: string;
  descripcion: string;
}

export interface Idioma {
  idioma: string;
}

export interface Programa {
  programa: string;
}

export interface Nivel {
  nivel: string;
}

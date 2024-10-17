//  Cursos
export interface Curso {
  codigo: string;
  idioma_id: number;
  programa_id: number;
  nivel_id: number;
  horario_id: number;
  mes: string;
  modalidad: string;
  fecha_inicio: string;
  fecha_fin: string;
  seccion?: string;
  docente_dni?: string;
  estado: number;
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

//  Docentes
export interface Docente {
  dni: string;
  paterno: string;
  materno: string;
  nombres: string;
  celular: string;
  correo: string;
  password?: string;
  estado?: boolean;
}

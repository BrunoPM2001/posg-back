//  Matrícula
export interface Matricula {
  curso_codigo: string;
  banco: string;
  pago: string;
  monto: string;
  fecha: string;
  file: File;
  [x: string]: File | string;
}

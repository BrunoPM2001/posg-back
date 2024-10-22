//  Matrícula
export interface Matricula {
  codigo: string;
  banco: string;
  pago: string;
  monto: number;
  fecha: string;
  file: ReadonlyArray<File>;
}

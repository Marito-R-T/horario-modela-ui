import { Aula } from "./Aula"
import { Catedratico } from "./Catedratico"
import { Seccion } from "./Seccion"

export class Periodo  {
  aula!: Aula
  catedratico?: Catedratico
  seccion?: Seccion
}
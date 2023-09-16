import { Aula } from "./Aula"
import { Catedratico } from "./Catedratico"
import { Errores } from "./Errores"
import { Materia } from "./Materia"
import { Seccion } from "./Seccion"

export class Periodo  {
  aula!: Aula
  catedratico?: Catedratico
  seccion?: Seccion
  materia?: Materia
  probabilidad?: number
  numPeriodo?: number
  errores?: Errores[]
  avisos?: Errores[]
}
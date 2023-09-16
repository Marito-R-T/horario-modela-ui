import { Aula } from "./Aula"
import { Periodo } from "./Periodo"
import { Seccion } from "./Seccion"

export class HorarioFinal {
  horas!: Array<Array<Periodo>>
  aulas!: Array<Aula>
  periodos!: number
  seccionesNoEncontradas!: Array<Seccion>
}
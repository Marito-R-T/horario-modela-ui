import { Aula } from "./Aula"
import { Periodo } from "./Periodo"

export class HorarioFinal {
  horas!: Array<Array<Periodo>>
  aulas!: Array<Aula>
  periodos!: number
}
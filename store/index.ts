import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    token: "",
    periodos: 5,
    porcentaje_catedratico_opcional: 0.1,
    porcentaje_fuera_hora: 0.5,
    porcentaje_fuera_capacidad: 0.4,
    porcentaje_materia_secundaria: 0.6,
    minimo_porcentaje_secciones_chicas: 0.3,
    diferencia_entre_secciones_aulas: 0.1,
    cantidad_horarios: 3
  }),
  actions: {
    increment() {
      // `this` is the store instance
      this.counter++
    },
    set(token: string) {
      this.token = token;
    },
    setPeriodos(periodos: number) {
      this.periodos = periodos;
    },
    setPorcentajeCatedraticoOpcional(porcentaje_catedratico_opcional: number) {
      this.porcentaje_catedratico_opcional = porcentaje_catedratico_opcional;
    },
    setPorcentajeFueraHora(porcentaje_fuera_hora: number) {
      this.porcentaje_fuera_hora = porcentaje_fuera_hora;
    },
    setPorcentajeFueraCapacidad(porcentaje_fuera_capacidad: number) {
      this.porcentaje_fuera_capacidad = porcentaje_fuera_capacidad;
    },
    setPorcentajeMateriaSecundaria(porcentaje_materia_secundaria: number) {
      this.porcentaje_materia_secundaria = porcentaje_materia_secundaria;
    },
    setMinimoPorcentajeSeccionesChicas(minimo_porcentaje_secciones_chicas: number) {
      this.minimo_porcentaje_secciones_chicas = minimo_porcentaje_secciones_chicas;
    },
    setDiferenciaEntreSeccionesAulas(diferencia_entre_secciones_aulas: number) {
      this.diferencia_entre_secciones_aulas = diferencia_entre_secciones_aulas;
    },
    setCantidadHorarios(cantidad_horarios: number) {
      this.cantidad_horarios = cantidad_horarios;
    },
  },
})
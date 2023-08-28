"use client"

import { ChangeEvent, useEffect, useState } from "react"
import styles from "../gastos-compartidos/GastosCompartidos.module.scss"

const listaPersonas = [
    {
        nombre: "Juancito",
        ingreso: 2000,
        porcentaje: '',
        montoPagar: ''
    },
    {
        nombre: "Pedrito",
        ingreso: 2400,
        porcentaje: '',
        montoPagar: ''
    },
    {
        nombre: "Julita",
        ingreso: 3800,
        porcentaje: '',
        montoPagar: ''
    }
]

const GastosCompartidos = () => {

    const [personas, setPersonas] = useState(listaPersonas)
    const [sumatoriaIngresos, setSumatoriaIngresos] = useState(0)
    const [gastosTotal, setGastosTotal] = useState('')
    const [nombre, setNombre] = useState('')
    const [ingreso, setIngreso] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [gastosErrorMessage, setGastosErrorMessage] = useState('')

    useEffect(() => {
        // console.log(personas)
        // calcular()
        // porcentajeIngresos()
    }, [])

    // Manejador de cambio para el nombre
    const handleInputChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value)
        console.log(event.target.value)
    }

    // Manejador de cambio para el ingreso
    const handleInputChangeIngreso = (event: ChangeEvent<HTMLInputElement>) => {
        setIngreso(event.target.value)
        console.log(event.target.value)
    }

    // Manejador de cambio para el total de gastos
    const handleGastosChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGastosTotal(event.target.value)
        console.log(event.target.value)
        setGastosErrorMessage('')
    }

    // Calculo total del app
    const calcular = () => {
        if (gastosTotal) {
            // 1. Actualizamos la sumatoria de ingresos
            setSumatoriaIngresos(calculoSumatoriaIngresos())
            // 2. Actualizamos el monto a pagar
            setPersonas(calcularMontoPagar())
        } else {
            console.log('Ingrese los gastos primero')
            setGastosErrorMessage('Ingrese el total de gastos primero')
        }
    }

    // porcentajes de ganancia
    const calcularPorcentajeIngresos = () => {
        const totalIngresos = calculoSumatoriaIngresos()
        const ListaConPorcentajesActualizados = personas.map(persona => ({
            ...persona,
            porcentaje: ((persona.ingreso / totalIngresos) * 100).toFixed(2),
        }));
        return ListaConPorcentajesActualizados
    }

    const calcularMontoPagar = () => {
        const ListaConPorcentajesActualizados = calcularPorcentajeIngresos()
        const listaMontoPagarActualizado = ListaConPorcentajesActualizados.map(persona => ({
            ...persona,
            montoPagar: ((Number(persona.porcentaje) / 100) * Number(gastosTotal)).toFixed(2),
        }))
        return listaMontoPagarActualizado
    }

    // Sumatoria de las ganancias
    const calculoSumatoriaIngresos = () => {
        const sumatoria = personas.reduce((total, persona) => total + persona.ingreso, 0);
        return sumatoria
    }

    // Agregar persona a la lista
    const agregarPersona = () => {
        if (nombre && ingreso) {
            const nuevaPersona = {
                nombre: nombre,
                ingreso: Number(ingreso),
                porcentaje: '',
                montoPagar: ''
            }

            setNombre('')
            setIngreso('')

            personas.push(nuevaPersona)
            setErrorMessage('')
        } else {
            console.log('Ingrese los campos')
            setErrorMessage('Ingrese los campos')
        }
    }

    return (
        <>
            <div id="gc_title">
                <h1>Calculadora de gastos compartidos</h1>
            </div>
            <label htmlFor="tipo-calculadora">Tipo:</label>
            <select name="tipo-calculadora" id="tipo-calculadora">
                <option value="">Equitativo</option>
                <option value="">Personalizado</option>
            </select>
            <div>
                <div className={styles.contenedor}>
                    <h2>Detalle de ganancias</h2>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={handleInputChangeNombre} />
                    <input type="number" placeholder="Ingresos por persona" value={ingreso} onChange={handleInputChangeIngreso} />
                    <button onClick={agregarPersona}>Añadir</button>
                    <span className={styles.errorMessage}>{errorMessage}</span>
                </div>
                <div className={styles.contenedor}>
                    <h2>Total de gastos</h2>
                    <input type="number" placeholder="Monto total" value={gastosTotal} onChange={handleGastosChange} />
                    <span className={styles.errorMessage}>{gastosErrorMessage}</span>
                </div>
                <div className={styles.contenedor}>
                    {
                        personas.map((item, index) => (
                            <p key={index} className={styles.ingresosLabel}>{index + 1}. {item.nombre}: <span className={styles.ingresosLabel}>S/. {item.ingreso}</span>
                                <br />
                                <span className={styles.porcentajeLabel}>Porcentaje: {item.porcentaje}%</span>
                                <br />
                                <span className={styles.montoPagarLabel}>Monto a pagar: S/. {item.montoPagar}</span>
                            </p>
                        ))
                    }
                </div>
                <button onClick={calcular}>Calcular</button>

                <div>
                    <h2 className={styles.ingresosLabel}>Ganancias totales: S/. {sumatoriaIngresos}</h2>
                    <h2 className={styles.montoPagarLabel}>Gastos totales: S/. {gastosTotal}</h2>

                </div>


            </div>
        </>
    )
}

export default GastosCompartidos

import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios'
import Error from './Error'



const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`




export const Formulario = ({setMoneda, setCriptomoneda}) => {

    // state del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [error, setError] = useState(false)

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar Americano'},
        { codigo: 'ARS', nombre: 'Peso Argentino'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    //utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

    //Ejecutar llamado a la API
    useEffect(() => {
      const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=ARS'

        const resultado = await axios.get(url)

        guardarCriptomonedas(resultado.data.Data);
      }
      consultarAPI();
    }, [])
    

    // cuando se hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar que ambos campos esten llenos
        if(moneda === '' || criptomoneda === ''){
            setError(true)
            return
        }
        //pasar los datos al componente principal
        setError(false)
        setMoneda(moneda)
        setCriptomoneda(criptomoneda)
    }


    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
            <SelectMonedas/> 
            <SelectCripto/>
            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
    )
}

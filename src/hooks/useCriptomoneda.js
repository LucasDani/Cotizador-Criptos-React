import React, { useState } from 'react'
import styled from '@emotion/styled'


const Label =styled.label`
    font-family: 'BEBAS Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`


export const useCriptomoneda = (label, stateInicial, opciones) => {

    //state de nuestro custom hooks
    const [state, setState] = useState(stateInicial)

    const SelectCripto = () => (
        <>
            <Label>{label}</Label>
            <Select
                onChange={e => {setState(e.target.value)}}
                value={state}
            >
                <option>Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </>
    )

    //retornar state, interfaz y funcion que modifica el state
    return [state, SelectCripto]
}

export default useCriptomoneda
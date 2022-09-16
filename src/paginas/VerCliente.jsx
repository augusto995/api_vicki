import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    useEffect(() => {
      
      const obtenerClienteAPI = async () => {
        try {
          const url = `https://my-json-server.typicode.com/augusto995/api_vicki/clientes${id}`
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setCliente(resultado)


        } catch (error) {
          console.log(error)
        }
        setCargando(!cargando)
      }
      obtenerClienteAPI()
    }, [])

  return (

    cargando ? <Spinner /> : 
      Object.keys(cliente).length === 0 ? 
      <p>No hay Resultados</p> : (

    <div>

      <h1 className='font-black text-4xl '>Ver Cliente: <span className='text-pink-300'>{cliente.nombre}</span>
      </h1>

      <p className='text-2xl text-gray-600 mt-4'>
        <span className='text-gray-800 uppercase font-bold'>Edad: </span>
        {cliente.edad}
      </p>

      <p className='text-2xl text-gray-600 mt-4'>
        <span className='text-gray-800 uppercase font-bold'>Documento: </span>
        {cliente.documento}
      </p>


      <p className='text-2xl text-gray-600 mt-4'>
        <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
        {cliente.telefono}
      </p>

      <p className='text-2xl text-gray-600 mt-4'>
        <span className='text-gray-800 uppercase font-bold'>Fecha de Nacimiento: </span>
        {cliente.fecha}
      </p>

      <p className='text-2xl text-gray-600 mt-4'>
        <span className='text-gray-800 uppercase font-bold'>Diagnostico: </span>
        {cliente.diagnostico}
      </p>
      
    </div>
    )
  )
}

export default VerCliente
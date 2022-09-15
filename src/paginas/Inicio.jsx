import {useState, useEffect} from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() =>{
    const obtenerClientesAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])
  const handleEliminar = async id => {
    const confirmar = confirm('¿Deseas Eliminar Este Cliente?')

    if(confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        await respuesta.json()
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes)

      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <>
    <h1 className='font-black text-4xl text-pink-300'>Pacientes</h1>
    <p className='text-pink-300 mt-3 font-bold'>Administra tus Pacientes</p>

    <table className='w-full mt-5 table-auto shadow bg-white'>

      <thead className='bg-pink-300 text-white'>
        <tr>
          <th className='p-2'>
            Nombre
          </th>
          <th className='p-2'>
            Edad
          </th>
          <th className='p-2'>
            Telefono
          </th>
          <th className='p-2'>
            Fecha
          </th>
          <th className='p-2'>
            Diagnostico
          </th>
          <th className='p-2'>
            Acciones
          </th>
        </tr>
      </thead>
        {clientes.map( cliente => (
          <Cliente
          key={cliente.id}
          cliente={cliente}
          handleEliminar={handleEliminar}
           />
        ))}
      <tbody>

      </tbody>

    </table>

</>
  )
}

export default Inicio

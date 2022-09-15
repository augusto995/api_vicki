import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {
  const navigate = useNavigate()

  const {nombre, edad,  telefono, fecha, diagnostico, id} = cliente
  return (
    <tr className='border-b text-center hover:bg-pink-100'> 
        <td className='p-3 '>{nombre}</td>
        <td className='p-3'>{edad}</td>
        <td className='p-3'>{telefono}</td>
        <td className='p-3'>{fecha}</td>
        <td className='p-3'>{diagnostico}</td>
        <td className='p-3'>

        <button type='button' className='bg-blue-400 hover:bg-blue-500 block w-full text-white p-2 uppercase font-bold text-xs mt-3'
        onClick={() => navigate(`/clientes/${id}`)}
        >
            Ver
          </button>
          <button type='button' className='bg-green-600 hover:bg-green-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'
          onClick={() => navigate(`/clientes/editar/${id}`)}>
            Editar
          </button>
          <button type='button' className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'
          onClick={() => handleEliminar(id)}>
            Eliminar
          </button>
        </td>
    </tr>
  )
}

export default Cliente
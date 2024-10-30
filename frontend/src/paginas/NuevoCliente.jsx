import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-pink-300'>Nuevo Paciente</h1>
        <p className='mt-3 text-pink-300 font-bold'>Llena los siguientes campos para registrar un paciente</p>

        <Formulario/>

    </>
  )
}

export default NuevoCliente
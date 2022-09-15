import React from 'react'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
        .min(3, 'El Nombre es muy Corto')
        .max(25, 'El Nombre es muy Largo')
        .required('El Nombre del Paciente es Obligatorio'),

        edad: Yup.number().required('La edad del paciente es Obligatoria').positive().integer('Numero no válido'),

        telefono:Yup.number().required('El Numero de Telefono es Obligatorio').positive().integer('Numero no válido'),

    })

    const handleSubmit =async (valores) => {
        try {
            let respuesta
            if (cliente.id){
                //Editando registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
    
            } else{
                //Nuevo Registro
                const url = 'http://localhost:4000/clientes'

            respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                    'Content-type': 'application/json'
                }
            })

            }

            await respuesta.json()
            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    cargando ? <Spinner /> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Paciente' : 'Agregar Paciente'}</h1>

        <Formik
        initialValues={{
            nombre: cliente?.nombre ?? "",
            edad: cliente?.edad ?? "",
            telefono: cliente?.telefono ?? "",
            fecha: cliente?.fecha ?? "",
            remedios: cliente?.diagnostico ?? ""

        }}

        enableReinitialize={true}

        onSubmit ={ async (values, {resetForm}) => {
            await handleSubmit(values)

            resetForm()
        } }

        validationSchema = {nuevoClienteSchema}
        >

            {({errors, touched}) => {
                //console.log(data)
                return (

            

            <Form
            className='mt-10'
            >
                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='nombre'
                    >Nombre:</label>
                    <Field
                    id='nombre'
                    type="text"
                    className='mt-2 block w-full p-3 bg-gray-200'
                    placeholder='Nombre del Paciente'
                    name='nombre'
                    />
                {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                ): null}    
                </div>

                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='edad'
                    >Edad:</label>
                    <Field
                    id='edad'
                    type="number"
                    className='mt-2 block w-full p-3 bg-gray-200'
                    placeholder='Edad del Paciente'
                    name='edad'
                    />
                    {errors.edad && touched.edad ? (
                    <Alerta>{errors.edad}</Alerta>
                ): null}
                </div>
                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='telefono'
                    >Teléfono:</label>
                    <Field
                    id='telefono'
                    type="tel"
                    className='mt-2 block w-full p-3 bg-gray-200'
                    placeholder='Telefono del Paciente'
                    name='telefono'
                    />
                    {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                ): null}
                </div>
                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='fecha'
                    >Fecha de Nacimiento:</label>
                    <Field
                    id='fecha'
                    type="date"
                    className='mt-2 block w-full p-3 bg-gray-200'
                    placeholder='Fecha'
                    name='fecha'
                    />
                </div>
                <div className='mb-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='diagnostico'
                    >Diagnostico:</label>
                    <Field
                    as="textarea"
                    id='diagnostico'
                    type="text"
                    className='mt-2 block w-full p-3 bg-gray-200 h-40'
                    placeholder='Diagnostico y anotaciones'
                    name='diagnostico'
                    />
                </div>
                <input 
                type='submit'
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Paciente'}
                className='mt-5 w-full bg-pink-300 p-3 text-white uppercase font-bold text-lg'
                />
            </Form>
            )}}
        </Formik>
    </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
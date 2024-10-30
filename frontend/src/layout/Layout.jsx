import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {

//Prueba
  const location = useLocation();
  const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-pink-300 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">Pacientes Vicki</h2>
        <nav className="mt-10">
          <Link 
          className={`${urlActual === '/' ? 'text-pink-500' : 'text-white'} text-2xl block mt-2 hover:text-pink-500`}
          to="/">Pacientes</Link>

          <Link 
          className={`${urlActual === '/nuevo' ? 'text-pink-500' : 'text-white'} text-2xl block mt-2 hover:text-pink-500`}
          to="/nuevo">Nuevo Paciente</Link>

        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>

      
    </div>
  )
}

export default Layout
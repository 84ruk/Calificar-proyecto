import Link from "next/link";

export const ToggleMenu = ({ toggleDropdown, userData, isOpen }) => {

    return(
        <div className=" relative" >

              <div className="flex items-center space-x-2 relative ">
              {/* Pedes usar un icono de persona aquí */}
    
    
              <button className="flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-150 w-8 h-8 dropdown-menu" onClick={toggleDropdown} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
                >
                {/* Contenido del icono de persona */}
              </svg>
            </button>
              <span>{userData?.fullName}</span> {/* mostrar el nombre del usuario */}
    
    
    
              </div>
    
              <div className='absolute '>
              {isOpen && (
                          <div
                            className="dropdown-menu absolute top-0 right-0 transition-transform duration-150 origin-top-right ml-5"
                            role="menu"
                          >
                            <div className="rounded-md shadow-lg bg-white w-40">
                              <ul className="list-none p-2">
                                <li>
                                  <Link href="#" className="text-gray-600 hover:bg-gray-100 block py-2 px-4">Tu información</Link>
                                </li>
                                <li>
                                  <Link href="/blog/crear-publicacion" className="text-gray-600 hover:bg-gray-100 block py-2 px-4">Crear publicación</Link>
                                </li>
                                <li>
                                  <Link href="#" className="text-gray-600 hover:bg-gray-100 block py-2 px-4">Evaluar profesor</Link>
                                </li>
                                <li>
                                  <Link href="#" className="text-gray-600 hover:bg-gray-100 block py-2 px-4">Cerrar sesión</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
          </div>
          </div>
    )
    
} 
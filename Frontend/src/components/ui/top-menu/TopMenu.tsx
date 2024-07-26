"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { useAuthStore } from '@/store';
import { getSession } from '@/actions/auth/get-session';
import { UserData } from '@/interfaces';
import { ToggleMenu } from './ToggleMenu';
import { logout } from '@/actions/auth/logout';
import { useRouter } from 'next/navigation';

export const TopMenu = () => {


  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen); // Invertir el estado anterior
  };
  
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu')) {
        closeDropdown();
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  const { userData, setSessionData, clearSession, loaded } = useAuthStore();

  const sessionChecked = useAuthStore(state => state.sessionChecked);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleLogout = async () => {
    const result = await logout();
    if (result.ok) {
      clearSession();
      router.refresh()
      setIsOpen(false);
    } else {
      console.log(result.message);
    }
  };

useEffect(() => {
  if (!sessionChecked) {
    fetchSession();
  }
}, [sessionChecked, isAuthenticated]);


  useEffect(() => {
  
    // Llama a fetchSession solo si sessionChecked es false
    if (!sessionChecked) {
      fetchSession();
    }
  }, [sessionChecked, isAuthenticated ]);
  

  const fetchSession = async () => {
    if (!sessionChecked) {
      const sessionData = await getSession();

      if( !sessionData ){
        clearSession();
      }
      else if (sessionData.isAuthenticated) {
        setSessionData(sessionData);
      } else {
        clearSession();
      }
    }
  };
  


  return (
    <header className="mt-5 p-5 flex justify-between items-center text-black">
      <nav className="space-x-4">
        <Link href="/" className=" hover:underline">
          Inicio
        </Link>
        <Link href="/profesores" className="hover:underline">
          Profesores
        </Link>
        <Link href="/blog" className=" hover:underline">
          Blog
        </Link>
        <Link href={"#"} className=" hover:underline">
          Contacto
        </Link>
      </nav>


      <div className="flex space-x-4">

      { loaded ? 
      (sessionChecked ? (
              isAuthenticated ? (
                
                <ToggleMenu toggleDropdown={ toggleDropdown } userData={ userData } isOpen={ isOpen } onLogout={handleLogout}  />


              ) : (
                <>
                <Link href={'/auth/login'} className='mt-2'>
                  Iniciar Sesión
                </Link>
                <Link href={'/auth/new-account'} className="btn-primary text-white px-4 py-2 rounded">
                  Registrarse
                </Link>
              </>
              )
          ) :  <>
          <Link href={'/auth/login'} className='mt-2'>
            Iniciar Sesión
          </Link>
          <Link href={'/auth/new-account'} className="btn-primary text-white px-4 py-2 rounded">
            Registrarse
          </Link>
        </> ) : ( 
          <button className="flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-150 w-8 h-8 animate-pulse" onClick={toggleDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600 animate-pulse" // Agrega la clase animate-pulse aquí
            >
              {/* Contenido del icono de persona */}
            </svg>
        </button>


         ) }
      
    </div>
    </header>
  );
};
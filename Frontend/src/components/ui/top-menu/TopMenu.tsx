"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { useAuthStore } from '@/store';
import { getSession } from '@/actions/auth/get-session';


export const TopMenu = () => {

  const [loaded, setLoaded] = useState(false);
  const { isAuthenticated, userData, setAuthenticated, setData } = useAuthStore();


  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession(); // Asume que getSession es una función que obtiene la sesión
      
      if (sessionData) {
        setAuthenticated(true);
        setData(sessionData);
        setLoaded(true); // Establece el estado loaded a true para que se renderice el componente correctamente después de la carga de la sesión.
      } else {
        setAuthenticated(false);
        setData(null);
        setLoaded(true);
      }
    };

    if (!loaded) {
      fetchSession();
    }
    console.log('Estado del Store:', { isAuthenticated, userData });
  }, [loaded, useAuthStore]);

/*   const renderAuthSection = () => {
    if (sessionStore.loading) {
      return <p>Loading...</p>; // Puedes mostrar un spinner u otro indicador de carga
    }
    if (sessionStore.user) {
      return (
        <div>
          {/* Sección de perfil 
          <p>Bienvenido, {sessionStore.user.fullName}</p>
        </div>
      );
    } */

  return (
    <header className="mt-5 p-5 flex justify-between items-center text-black">
      <nav className="space-x-4">
        <Link href="/" className=" hover:underline">
          Inicio
        </Link>
        <Link href="/profesores" className="hover:underline">
          Profesores
        </Link>
        <Link href="#" className=" hover:underline">
          Blog
        </Link>
        <Link href="#" className=" hover:underline">
          Contacto
        </Link>
      </nav>


      <div className="flex space-x-4">
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
        {/* Puedes usar un icono de persona aquí */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-gray-600"
        >
          {/* Contenido del icono de persona */}
        </svg>
        <span>{userData?.fullName}</span> {/* Puedes mostrar el nombre del usuario */}
      </div>
        
      ) : (
        <>
          <Link href={'/auth/login'} className='mt-2'>
            Iniciar Sesión
          </Link>
          <Link href={'/auth/new-account'} className="btn-primary text-white px-4 py-2 rounded">
            Registrarse
          </Link>
        </>
      )}
    </div>
    </header>
  );
};
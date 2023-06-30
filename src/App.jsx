import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { PrincipalContext } from './PrincipalProvider';
import SlidesCandidatos from './components/SlidesCandidatos';
import { ListaCandidatos } from './data/dataCandidatos';
import { Header } from './components/Header';
import Footer from './components/Footer';
import BarraLateral from './components/BarraLateral';
import { VotacionParcial } from './components/VotacionParcial';
import './App.css';

function App() {

  const sliderRef = useRef(null);
  const headerRef = React.createRef();

  // From PrincipalProvider
  const { instancia, setInstancia, votacion, setVotacion, candidatoSeleccionadoProvider, setCandidatoSeleccionadoProvider, candidatoDetalle, setCandidatoDetalle } = useContext(PrincipalContext);


  function handleVotar(instancia, candidatoId) {
    const candidatoSeleccionado = ListaCandidatos[instancia].candidatos.find(
      candidato => candidato.id === candidatoId
    );

    const voto = {
      candidatoId,
      candidatoCargo: ListaCandidatos[instancia].titulo,
      candidatoNombre: candidatoSeleccionado.nombre,
      candidatoPartido: candidatoSeleccionado.partido,
      candidatoImg: candidatoSeleccionado.img
    };

    setVotacion([...votacion, voto]);

    if (instancia <= 2) {
      sliderRef.current.slickGoTo(instancia);
    }
    setInstancia(instancia + 1);

    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500)
  }



  // Boton de Volver
  function handleVolver(instancia) {
    setInstancia(instancia)
    sliderRef.current.slickGoTo(instancia - 1)
    setVotacion([...votacion.slice(0, -1)])

  }



  return (
    <>

      <Header ref={headerRef} />
      <div className='container w-full max-w-6xl mx-auto pb-24 relative z-10'>
        <div className='box-volver mx-5 mt-5 h-[40px]'>
          {instancia > 1 && instancia <= 3 && (

            <a
              href="#"
              className='btn btn-secondary flex content-center items-center w-fit capitalize mt-5 px-5'
              onClick={(e) => {
                e.preventDefault()
                handleVolver(instancia - 1)
              }}
              title='Volver al paso anterior'
            >
              <svg
                className='h-[18px] -ml-1 mr-1'
                width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(71 85 105 / var(--tw-text-opacity))" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5" fill="none"></path>
              </svg>
              <span className='ml-1'>Volver</span>
            </a>

          )}
        </div>

        <SlidesCandidatos
          instancia={instancia}
          handleVotar={handleVotar}
          votacion={votacion}
          setVotacion={setVotacion}
          lista={ListaCandidatos} // Pasar la lista como prop
          sliderRef={sliderRef} // Pasar el ref del slider como prop
        />

        <VotacionParcial 
          sliderRef = {sliderRef}
        />
      </div>
      <div className="text-[150px] md:text-[350px] leading-none text-center text-slate-300 opacity-20 absolute bottom-4 md:bottom-0  w-full z-0">2023</div>
      <Footer />
      <BarraLateral candidatoSeleccionado={candidatoDetalle} />
    </>
  );
}

export default App

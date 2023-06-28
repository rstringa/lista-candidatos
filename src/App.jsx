import React from 'react';
import { useState, useRef, useEffect } from 'react';
import SlidesCandidatos from './components/SlidesCandidatos';
import { ListaCandidatos } from './data/dataCandidatos';
import { Header } from './components/Header';
import Footer from './components/Footer';
import BarraLateral from './components/BarraLateral';
import './App.css';

function App() {
  const [votacion, setVotacion] = useState([]);
  const [instancia, setInstancia] = useState(1);
  const [botonesHabilitados, setBotonesHabilitados] = useState(true);
  const [mensajeFinal, setMensajeFinal] = useState(false);
  const [mensajeFinalVisible, setMensajeFinalVisible] = useState(false);
  const [boxFinalButtons, setBoxFinalButtons] = useState(true);
  const sliderRef = useRef(null);
  const headerRef = React.createRef();

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
  }

  function handleComenzarVotacion() {
    sliderRef.current.slickGoTo(0);
    setInstancia(1);
    setVotacion([]);
    setMensajeFinal(false);
    setMensajeFinalVisible(false);
    setBoxFinalButtons(true);
    setBotonesHabilitados(true);
  }


  function handleCambiarVotacion() {
    sliderRef.current.slickGoTo(0);
    setInstancia(1);
    setVotacion([]);
    setMensajeFinal(false);
    setMensajeFinalVisible(false);
    setBoxFinalButtons(true);
    console.log(headerRef)
    if (headerRef.current) {

      headerRef.current.scrollIntoView({
        behavior: 'smooth', // Habilita el desplazamiento animado
        block: 'start' // Desplázate hacia la parte superior del elemento
      });
    }
  }

  function handleConfirmarVotacion() {
    setMensajeFinal(true)
    setBoxFinalButtons(false)
    setTimeout(function () {
      setMensajeFinalVisible(true)
    }, 500);
  }

  // Boton de Volver
  function handleVolver(instancia) {
    setInstancia(instancia)
    sliderRef.current.slickGoTo(instancia - 1)
    setVotacion([...votacion.slice(0, -1)])

  }

  // Habilitar Boton de "Cambiar Votacion"
  useEffect(() => {
    if (instancia <= 1) {
      setBotonesHabilitados(false);
    } else {
      setBotonesHabilitados(true);
    }
  }, [instancia]);

  return (
    <>
      <Header ref={headerRef} />
      <div className='container w-full max-w-6xl mx-auto pb-24'>
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

        {/* {instancia >= 2 && ( */}
        <>
          <h2 className={`${instancia <= 3 ? "mt-20" : "mt-0"} titulo`}>Votación {instancia <= 3 ? "parcial" : "final"}</h2>

          <ul className='grid grid-cols-1 md:grid-cols-3 gap-7 mx-5'>

            {votacion.map((voto, index) => (
              <li
                className='shadow-xl rounded-xl bg-slate-100'
                key={index}>
                {voto.candidatoImg ?
                  <img
                    className='shadow-sm rounded-t-xl aspect-square  object-cover max-h-[250px]'
                    src={voto.candidatoImg}
                    alt={voto.candidatoNombre}
                    loading="lazy"
                    width={400} />
                  : <div className="no-image"></div>
                }
                <div className='body text-center px-5 py-7'>
                  <h2 className='text-xl font-normal mx-auto mb-4  bg-slate-300 rounded-full text-slate-500 '>{voto.candidatoCargo}</h2>
                  <h3 className='text-2xl font-bold mb-1 text-slate-800'>{voto.candidatoNombre}</h3>
                  <p className='text-[18px] font-normal text-slate-600'>{voto.candidatoPartido}</p>
                </div>
              </li>
            ))}
            {instancia == 1 &&
              <li className="column-placeholder border-2 border-xl border-slate-300 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
                <h3 className='text-3xl text-slate-400'>Presidente</h3></li>
            }
            {instancia <= 2 &&
              <li className="column-placeholder border-2 border-xl border-slate-300 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
                <h3 className='text-3xl text-slate-400'>Gobernador</h3>
              </li>
            }
            {instancia <= 3 &&
              <li className="column-placeholder border-2 border-xl border-slate-300 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
                <h3 className='text-3xl text-slate-400'>Intendente</h3>
              </li>
            }
          </ul>
          {boxFinalButtons && (

            <div className='box-final-buttons text-center'>

              <button
                className='btn btn-secondary btn-big font-bold mt-12 mx-5 bg-white'
                onClick={handleCambiarVotacion} disabled={!botonesHabilitados}>
                Cambiar Votación
              </button>
              {instancia >= 4 && (
                <button
                  className='btn btn-big mt-9 mx-5'
                  onClick={handleConfirmarVotacion} >
                  Confirmar Votación
                </button>
              )}
            </div>
          )}

          {mensajeFinal && (
            <div className={`mensaje-final opacity-0 box-thanks text-center px-5 py-16 ${mensajeFinalVisible ? "is--visible" : ""} `}>
              <h3 className='text-center text-4xl text-slate-700'>Gracias. Tu votación ha sido enviada.</h3>
              <button
                className='btn btn-secondary btn-big font-bold mt-12 mx-auto'
                onClick={handleComenzarVotacion}>
                Comenzar de nuevo
              </button>
            </div>
          )
          }
        </>
        {/* )} */}
      </div>
      <BarraLateral />
      <Footer />
    </>
  );
}

export default App

import { useState, useRef } from 'react';
import SlidesCandidatos from './components/SlidesCandidatos';
import { ListaCandidatos } from './data/dataCandidatos';
import Header from './components/Header';
import './App.css';

function App() {
  const [votacion, setVotacion] = useState([]);
  const [instancia, setInstancia] = useState(1);
  const [botonesHabilitados, setBotonesHabilitados] = useState(true);
  const sliderRef = useRef(null);

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

  function handleCambiarVotacion() {
    sliderRef.current.slickGoTo(0);
    setInstancia(1);
    setVotacion([]);
  }

  function handleConfirmarVotacion() {
    setBotonesHabilitados(false);
    setTimeout(function () {
      setInstancia(instancia + 1);
      sliderRef.current.slickGoTo(instancia - 1);
    }, 1000);
    console.log(votacion)
  }

  function handleVolver(instancia) {
    setInstancia(instancia)
    sliderRef.current.slickGoTo(instancia - 1)
    setVotacion([...votacion.slice(0, -1)])

  }

  return (
    <>
      <Header />
      <div className='container w-full max-w-6xl mx-auto'>
        <div className='box-volver mx-5 mt-2 h-[40px]'>
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
                className='h-[18px]'
                width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(71 85 105 / var(--tw-text-opacity))" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5" fill="none"></path>
              </svg>
              <span className='ml-1'>Votación anterior</span>
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

        {instancia >= 2 && (
          <>
            <h2 className='titulo-final mt-20'>Votación {instancia <= 3 ? "parcial" : "final"}</h2>
            <ul className='grid grid-cols-3 gap-7 mx-5'>
              {votacion.map((voto, index) => (
                <li
                  className='shadow-xl rounded-xl'
                  key={index}>
                  {voto.candidatoImg ?
                    <img
                      className='shadow-sm rounded-t-xl aspect-square object-cover'
                      src={voto.candidatoImg}
                      alt={voto.candidatoNombre}
                      loading="lazy"
                      width={400} />
                    : <div className="no-image"></div>
                  }
                  <div className='body text-center p-5'>
                    <h2 className='text-xl font-normal mb-5  bg-slate-200 rounded-full text-slate-500'>{voto.candidatoCargo}</h2>
                    <h3 className='text-3xl font-bold mb-1 text-slate-800'>{voto.candidatoNombre}</h3>
                    <p className='text-xl font-normal text-slate-800'>{voto.candidatoPartido}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleCambiarVotacion} disabled={!botonesHabilitados}>
              Cambiar Votación
            </button>
            {instancia >= 4 && (
              <button onClick={handleConfirmarVotacion} disabled={!botonesHabilitados}>
                Confirmar Votación
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App

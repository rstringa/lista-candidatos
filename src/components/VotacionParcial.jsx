import { useState, useContext, useEffect } from 'react';
import { PrincipalContext } from '../PrincipalProvider';
import "./VotacionParcial.css";

export const VotacionParcial = ({sliderRef}) => {
 const { instancia, setInstancia, votacion, setVotacion } = useContext(PrincipalContext);
 const [botonesHabilitados, setBotonesHabilitados] = useState(true);
 const [mensajeFinal, setMensajeFinal] = useState(false);
 const [mensajeFinalVisible, setMensajeFinalVisible] = useState(false);
 const [boxFinalButtons, setBoxFinalButtons] = useState(true);
 const [cambiarVotacion, setCambiarVotacion] = useState(false);

 function handleComenzarVotacion() {
    sliderRef.current.slickGoTo(0);
    setInstancia(1);
    setVotacion([]);
    setMensajeFinal(false);
    setMensajeFinalVisible(false);
    setBoxFinalButtons(true);
    setBotonesHabilitados(true);
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500)
  }


  function handleCambiarVotacion() {
    sliderRef.current.slickGoTo(0);
    setInstancia(1);
    setVotacion([]);
    setMensajeFinal(false);
    setMensajeFinalVisible(false);
    setBoxFinalButtons(true);
    setCambiarVotacion(!cambiarVotacion);
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500)

  }


  function handleConfirmarVotacion() {
    setMensajeFinal(true)
    setBoxFinalButtons(false)
    setTimeout(function () {
      setMensajeFinalVisible(true)
    }, 500);
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
    <h2 className={`${instancia <= 3 ? "mt-0 md:mt-20 " : "mt-0"} titulo-final`}>Votación {instancia <= 3 ? "Parcial" : "Final"}</h2>

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
        <li className="column-placeholder border-2 border-xl border-slate-400 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
          <h3 className='text-3xl text-slate-400'>Presidente</h3></li>
      }
      {instancia <= 2 &&
        <li className="column-placeholder border-2 border-xl border-slate-400 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
          <h3 className='text-3xl text-slate-400'>Gobernador</h3>
        </li>
      }
      {instancia <= 3 &&
        <li className="column-placeholder border-2 border-xl border-slate-400 border-dashed rounded-xl h-[420px] flex place-items-center place-content-center">
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
  )
}

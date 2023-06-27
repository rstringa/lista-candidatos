import { useState, useRef } from 'react';
import SlidesCandidatos from './components/SlidesCandidatos';
import { ListaCandidatos } from './data/dataCandidatos';

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
      candidatoPartido: candidatoSeleccionado.partido    
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
    setTimeout(function() {
      setInstancia(instancia + 1);
      sliderRef.current.slickGoTo(instancia-1);
    }, 1000);
    console.log(votacion)
  }

  function handleVolver(instancia) {
    setInstancia(instancia)
    sliderRef.current.slickGoTo(instancia-1)
    setVotacion([...votacion.slice(0, -1)])
   
  }

  return (
    <>
      <div className='Volver'>
        {instancia > 1 && instancia <= 3 && (
          <a 
            href="#"
            onClick={(e) => { 
              e.preventDefault();
              handleVolver(instancia-1);
            }} 
            title='Volver al paso anterior'
          >
            Volver
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
          <h2>Votación {instancia <= 2 ? "parcial" : "final"}</h2>
          <ul>
            {votacion.map((voto, index) => (
              <li key={index}>
                {voto.candidatoCargo} - {voto.candidatoNombre} - {voto.candidatoPartido}
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
    </>
  );
}

export default App

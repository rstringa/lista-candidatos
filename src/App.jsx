import { useState, useRef } from 'react'
import { ListaCandidatos } from './ListaCandidatos'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './App.css'

function App() {

  const [lista, setLista] = useState(Object.values(ListaCandidatos))
  const [votacion, setVotacion] = useState([])
  const [instancia, setInstancia] = useState(0)
  const [botonesHabilitados, setBotonesHabilitados] = useState(true);
  const sliderRef = useRef(null);
  
  const sliderSettings =  {
    dots: false,
    arrows:false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: 'false',
    swipe: false,
    swipeToSlide: false,
    touchMove: false,
    accessibility: false,
  }


  function handleVotar(instancia, candidatoId) {
    const candidatoSeleccionado = lista[instancia].candidatos.find(
      candidato => candidato.id === candidatoId
    )

    const voto = {
        candidatoId,
        candidatoCargo : lista[instancia].titulo,
        candidatoNombre : candidatoSeleccionado.nombre,
        candidatoPartido : candidatoSeleccionado.partido    
    }
    setVotacion([...votacion, voto])
    // Si no es la ultima que no avance
    if( instancia <= 1) { 
      sliderRef.current.slickGoTo(instancia+1)
    }
    setInstancia(instancia + 1)

  }

  function handleCambiarVotacion(){
    sliderRef.current.slickGoTo(0);
    setInstancia(0);
    setVotacion([]);
  }
  function handleConfirmarVotacion(){

     // Deshabilitar los botones
    setBotonesHabilitados(false);

    setTimeout(function(){
      sliderRef.current.slickGoTo(3);
      setInstancia(instancia+1);
    },1000)

  }
  function handleVolver(instancia){
    setInstancia(instancia-1);
    sliderRef.current.slickGoTo(instancia-1);
    
    // Eliminar el ultimo objeto
    setVotacion([...votacion.slice(0, -1)]);
    console.log( votacion )
  }  

  return (
    <>
     <div className='Volver'>
    { instancia >= 1 && instancia <= 2 && (
        <a 
        href="#"
        onClick={(e) => { e.preventDefault(); handleVolver(instancia) }} 
        title='Volver al paso anterior'>Volver</a>      
    )}
      </div>
     <Slider {...sliderSettings}  ref={sliderRef}>
      {lista.map((item, index) => (
  
          <div key={index} className='box-slider'>
            {/* {index == instancia && */}
              <div key={item.titulo}>
                <h2>{item.titulo}</h2>
                <ul>
                  {item.candidatos.map((candidato) => (
                    <li key={candidato.id}>
                      {candidato.nombre} - {candidato.partido}
                      <button

                        onClick={(e) => handleVotar(instancia, candidato.id)}
                      >Votar</button>
                    </li>
                  ))}
                 
                </ul>
              </div>
            {/* } */}
          </div>
       
      ))}
        <div key={4} className='box-slider'>
          <h1>Gracias. Tu votación ha sido enviada.</h1>
        </div>
      </Slider>
      { instancia >= 1 && 
      <>
      <h2>Votación { instancia <= 1 ? "parcial" : "final"}</h2>

      <ul>
        {votacion.map((voto, index) => {
          const candidatoCargo = voto.candidatoCargo
          const candidatoNombre = voto.candidatoNombre
          const candidatoPartido = voto.candidatoPartido
          return (
            <li key={index}>
              {candidatoCargo} - {candidatoNombre} - { candidatoPartido }
            </li>
          )
        })}
      </ul>
     
        <button onClick={handleCambiarVotacion} disabled={!botonesHabilitados}>Cambiar Votación</button>
      
      { instancia >= 3 && 
        <button onClick={handleConfirmarVotacion} disabled={!botonesHabilitados}>Confimar Votación</button>
      }
      </>
    }
    </>
  )
}

export default App



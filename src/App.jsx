import { useState } from 'react'
import { ListaCandidatos } from './ListaCandidatos'
import './App.css'

function App() {

  const [lista, setLista] = useState(Object.values(ListaCandidatos))
  const [votacion, setVotacion] = useState([])
  // console.log( Object.values(ListaCandidatos))
  const [instancia, setInstancia] = useState(0)

  function handleVotar(instancia, candidatoId) {
    const candidatoSeleccionado = lista[instancia].candidatos.find(
      candidato => candidato.id === candidatoId
    )

    const voto = {
      [candidatoId.toString()]: `${candidatoSeleccionado.nombre} - ${candidatoSeleccionado.partido}`
    }

    setVotacion([...votacion, voto])
    setInstancia(instancia + 1)
    // console.log(votacion)
  }

  return (
    <>
      {lista.map((item, index) => (
        <div key={index}>
          {index == instancia &&
            <div key={item.titulo}>
              <h2>{item.titulo}</h2>
              <ul>
                {item.candidatos.map((candidato) => (
                  <li key={candidato.id}>
                    {candidato.nombre} - {candidato.partido}
                    <button

                      onClick={() => handleVotar(instancia, candidato.id)}
                    >Votar</button>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      ))}

      <h2>Votación:</h2>

      <ul>
        {votacion.map((voto, index) => {
          const candidatoId = Object.keys(voto)[0]
          const candidatoNombre = Object.values(voto)[0]
          return (
            <li key={index}>
              {candidatoId}: {candidatoNombre}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App



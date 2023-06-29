import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlidesCandidatos.css';
import BarraLateral from './BarraLateral';

const SlidesCandidatos = ({ instancia, handleVotar, votacion, setVotacion, lista, sliderRef }) => {
    const [candidatoSeleccionado, setCandidatoSeleccionado] = useState({});
    // const [barraLateralOpen, setBarraLateralOpen] = useState(false);

    const [sliderSettings] = useState({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
        accessibility: false,
    });

    function handleBarraLateral(img, nombre, partido, propuesta) {
        const candidatoElegido = {
            img,
            nombre,
            partido,
            propuesta
        }
        setCandidatoSeleccionado(candidatoElegido)
        // setBarraLateralOpen(true)
        openBarraLateral()
    }
    function openBarraLateral() {
        const barraLateral = document.querySelector(".barra-lateral");
        barraLateral.classList.add("is--visible");
    }
    // useEffect(() => {
    //     setBarraLateralOpen(true);
    // }, [barraLateralOpen]);

    // console.log(barraLateralOpen)
    return (
        <>
            <Slider
                className={`${instancia == 4 ? 'is--invisible' : ''} ${instancia == 5 ? 'slider-final' : ''} custom-slider`}
                {...sliderSettings} ref={sliderRef}>
                {Object.values(lista).map((item, index) => (
                    <div key={index}
                        className="box-slider">

                        <h2 className='titulo'
                        >{item.titulo}</h2>
                        <ul className="grid grid-cols-3 gap-7 mx-5 pb-9  ">
                            {item.candidatos.map((candidato) => (
                                <li
                                    key={candidato.id}
                                    className='shadow-xl rounded-xl bg-white '
                                >
                                    {candidato.img ?
                                        <img
                                            className='shadow-sm rounded-none md:rounded-t-xl aspect-square object-cover h-full md:max-h-[250px]'
                                            src={candidato.img}
                                            alt={candidato.nombre}
                                            loading="lazy"
                                            width={400} />
                                        : <div className="no-image"></div>
                                    }
                                    <div className='body text-center p-5'>
                                        <a
                                            className='flex md:justify-center text-slate-500 hover:text-slate-700'
                                            href="#"
                                            onClick={function (e) {
                                                e.preventDefault()
                                                handleBarraLateral(candidato.img, candidato.nombre, candidato.partido, candidato.propuesta)
                                            }}
                                        >


                                            <span>
                                                <svg 
                                                className='w-[21px] mr-1 mb-2'
                                                width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
   <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3"></path>
                                            </svg></span>
                                            <span>Actividad</span></a>
                                        <h3 className='text-2xl md:text-3xl font-bold mb-1 text-slate-800'>{candidato.nombre}</h3>
                                        <p className='text-md md:text-xl font-normal text-slate-500'>{candidato.partido}</p>
                                        <button
                                            className='btn mt-7 mb-0 md:mb-3 '
                                            onClick={() => handleVotar(instancia, candidato.id)}>Votar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>


                ))}
                {/* <div key={4} className='box-slider'>
                <h1 className='text-center text-4xl text-slate-700'>Gracias. Tu votación ha sido enviada.</h1>
            </div> */}
            </Slider>

            <BarraLateral
                // barraLateralOpen={barraLateralOpen}
                candidatoSeleccionado={candidatoSeleccionado} />
        </>
    );
};

export default SlidesCandidatos;

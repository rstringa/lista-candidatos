import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlidesCandidatos.css';

const SlidesCandidatos = ({ instancia, handleVotar, votacion, setVotacion, lista, sliderRef }) => {
    //   console.log("SC - " + instancia)  
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


    return (
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
    );
};

export default SlidesCandidatos;

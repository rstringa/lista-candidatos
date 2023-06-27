import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        <Slider {...sliderSettings} ref={sliderRef}>
            {Object.values(lista).map((item, index) => (
                <div key={index} className='box-slider'>
                    <div key={item.titulo}>
                        <h2>{item.titulo}</h2>
                        <ul>
                            {item.candidatos.map((candidato) => (
                                <li key={candidato.id}>
                                    {candidato.img ?
                                        <img
                                            src={candidato.img}
                                            alt={candidato.nombre}
                                            loading="lazy"
                                            width={400} />
                                        : <div className="no-image"></div>
                                    }
                                    {candidato.nombre} - {candidato.partido}
                                    <button onClick={() => handleVotar(instancia, candidato.id)}>Votar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            ))}
            <div key={4} className='box-slider'>
                <h1>Gracias. Tu votación ha sido enviada.</h1>
            </div>
        </Slider>
    );
};

export default SlidesCandidatos;

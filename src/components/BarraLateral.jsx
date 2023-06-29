// import { useState, useEffect } from 'react';
import "./BarraLateral.css"

const BarraLateral = ({barraLateralOpen, candidatoSeleccionado }) => {
//   const verDetalle = candidatoSeleccionado.verDetalleCandidato;
//   const [open, setOpen] = useState(barraLateralOpen);  
//   console.log(open)

 function handleClose(){
    const barraLateral = document.querySelector(".barra-lateral");
    barraLateral.classList.remove("is--visible");
 }
 
//  useEffect(() => {
//     setOpen(barraLateralOpen);
//   }, [barraLateralOpen]);
  
  
  return (
    <>
    {/* { open && ( */}
        <div className="barra-lateral flex flex-col fixed z-10 top-0  h-screen  w-[75%] md:w-[350px] bg-slate-50 p-5 md:p-7 shadow-2xl">
            <a href="#" 
            className='self-end text-2xl mb-2 text-slate-600'
            onClick={ (e) => {e.preventDefault(); handleClose()} }>X</a>
            <div className='overflow-y-auto'>
                <img 
                className='shadow-sm rounded-xl aspect-square  object-cover max-h-[180px] md:max-h-[250px]'
                src={candidatoSeleccionado.img} alt={candidatoSeleccionado.nombre} />
            <h3 className='text-[25px] font-bold mt-3 mb-0 text-slate-700'>{candidatoSeleccionado.nombre}</h3>
            <h4 className='text-[18px] font-normal  mb-5 text-slate-500'>{candidatoSeleccionado.partido}</h4>
            <h5 className='text-[16px] font-bold text-slate-500 mb-1'>Actividad</h5>
            <p className='text-[16px] font-normal  mb-2 text-slate-500'>{candidatoSeleccionado.propuesta}</p>
            </div>
        </div>
    
    {/* )} */}
    </>
  )
}

export default BarraLateral
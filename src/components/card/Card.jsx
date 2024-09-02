import { useState } from 'react';

import alert from '../../assets/icons/UI/alert.png';
import check from '../../assets/icons/UI/check.png';

import Primary_button from '../buttons/Primary_button';
import Secundary_button from '../buttons/Secundary_button';

function Card({titulo, usuarioAtual, dataInicio, dataFim, status}){
    return (
        <div className="bg-iflab_white_light w-fit px-9 py-5 rounded-lg shadow-md hover:shadow-lg duration-100">
            <div className="flex flex-row justify-between items-center gap-36">
                <h1 className="text-lg font-bold">Laboratório <span className='text-iflab_green_light'>{titulo}</span></h1>
                <h1 className="text-sm text-iflab_gray flex justify-center items-center gap-2"><img src={status? check : alert} alt="Status do laboratório" className='h-[25px]'/>{status? "Livre para reservar" :  "Em uso atualmente"}</h1>
            </div>
            <div className="justify-between pt-7 flex flex-col gap-2">
                <h1 className="text-sm font-black text-iflab_gray">Usuário atual: {usuarioAtual ? usuarioAtual : "--"}</h1>
                <h1 className='text-sm font-black text-iflab_gray'>Data de início da sessão: {dataInicio ? dataInicio : "--"}</h1>
                <h1 className='text-sm font-black text-iflab_gray'>Data de término da sessão: {dataFim ? dataFim : "--"}</h1>
            </div>
            <div className='pt-7 flex justify-end w-full '>
                {status ? <Primary_button text="Reservar"/> : <Secundary_button text="Ver informações"/>}
            </div>
        </div>

    )
    
         
}

export default Card;
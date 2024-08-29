function Card({titulo, usuarioAtual, dataInicio, dataFim, status}){
    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-lg font-bold">{titulo}</h1>
                <h1 className="text-sm font-bold">{status}</h1>
            </div>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-sm">{usuarioAtual}</h1>
                <h1 className="text-sm">{dataInicio} - {dataFim}</h1>
            </div>
        </div>

    )
    
         
}

export default Card;
import style from './paginicial.module.css'

const PagIncial = () =>{
    return(
        <div className={style.PagIncial}>

            <div className={style.imgContainer}>

                <img className={style.fundo} src='./public/fundo2.jpg'></img>
                <div className={style.sobreposto}>

                    <div className={style.conteudoCard}>
                        <h3>Título do card</h3>
                        <p>Texto texto texto</p>
                    </div>
                    
                </div>

            </div>
            
            {/*'PAGINA' É O NOME DA DIV QUE FORMATA OQ ESTÁ EMBAIXO DA IMAGEM*/}
            <div className={style.pagina}>
                <h1>Conheça a nossa história!</h1>

                {/*GALERIA PARA OS CARDS*/}
                <div className={style.galeria}>

                    <div className={style.card1}>
                        <div className={style.conteudoCard}>
                            <h3>Título do card</h3>
                            <p>Texto texto texto</p>
                        </div>
                    </div>

                    <div className={style.card2}>
                        {/*NÃO TIRA DAQUI PLMDS*/}
                    </div>

                    <div className={style.card3}>
                        <div className={style.conteudoCard}>
                            <h3>Título do card</h3>
                            <p>Texto texto texto</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
    )
}

export { PagIncial }
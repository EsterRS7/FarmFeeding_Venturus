import style from './cabecalho.module.css'

const Cabecalho = () =>{
    return(
        <div className={style.Cabecalho}>
            {/* LADO ESQUERDO */}
            <div className={style.filho}>
                <img src='./public/fazenda.png'></img> 
            </div>
            <div className={style.nome}>
                Farm<span>Feed</span>
            </div>
            
            {/* LADO DIREITO */}
            <div className={style.direito}>
                <button className={style.cad}>Cadastre-se</button>
                <button className={style.login}>Login</button>
            </div>
        </div>
    )
}

export {Cabecalho}
import style from './rodape.module.css'

const Rodape = () => {
    return(
    <div className={style.Rodape}>
        <div className={style.container}>
            <p>© 2025 FarmFeeding. Todos os direitos reservados.</p>
            <p>Projeto acadêmico desenvolvido no âmbito do Projeto Venturus.</p>
            <p>ETEC da Zona Leste – São Paulo/SP</p>
        </div>
    </div>
    )
}

export { Rodape }
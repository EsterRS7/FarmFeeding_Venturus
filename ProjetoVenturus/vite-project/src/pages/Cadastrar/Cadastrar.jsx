import { FormCadastrar } from '../../components/FormCadastrar/FormCadastrar';
import style from './Cadastrar.module.css';

const Cadastrar = () => {
        return(
            <div className={style.Cadastrar}>
                <FormCadastrar />
                
            </div>
        );
    };
export {Cadastrar};
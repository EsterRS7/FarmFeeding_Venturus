import { FormLogin } from '../../components/FormLogin/FormLogin';
import style from './Login.module.css';

const Login = () => {
        return(
            <div className={style.Login}>
                <FormLogin />
            </div>
        );
    };
export {Login};
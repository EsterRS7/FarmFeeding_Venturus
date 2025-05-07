// paginicial.jsx
import { ListarGrupos } from '../../components/ListarGrupos';
import { AuthContext } from '../../Context'; // Importar o AuthContext
import { useContext } from 'react'; // Importar useContext
import style from './paginicial.module.css';
import { BotaoCadastrarProduto } from '../../components/BotãoGrupo/BotãoCadastrarProduto/BotaoCadastrarProduto';
import { ListaProdutos } from '../../components/ListarProdutos/ListarProdutos';
import { Link } from 'react-router-dom';
import { BotaoCadastrarGrupo } from '../../components';

const PagIncial = () => {
    const { usuario } = useContext(AuthContext); // Obter o estado do usuário

    return (
        <div className={style.PagIncial}>
            <div className={style.imgContainer}>
                <img className={style.fundo} src='./public/fundo2.jpg' alt="Fundo" />
                <div className={style.sobreposto}>
                    <div className={style.conteudoCard}>
                        <h3 className={style.slogan}>Controle no campo, cuidado com os animais</h3>
                        <center><p>Control in the field, care for animals</p></center>
                    </div>
                </div>
            </div>

            <div className={style.pagina}>
                <div className={style.galeriaGrupo}>
                    {/* Renderizar ListarGrupos apenas se o usuário estiver autenticado */}
                    {usuario ? (<div>
                            <h2 className={style.h2A}><BotaoCadastrarGrupo/></h2>
                            <ListarGrupos/>
                            <br/><hr/><br/>
                        </div>
                    ): <p></p>}
                </div>
                    
            

                <h2 className={style.h2}>Conheça a nossa história!</h2>

                <p>Nossa plataforma foi criada para transformar a maneira como fazendeiros gerenciam seus recursos e cuidam de seus animais. Com uma interface simples e inteligente, o sistema permite o controle preciso de estoque, suprimentos e necessidades diárias de cada animal.
                Você saberá exatamente quando algo está faltando ou sobrando — evitando desperdícios, reduzindo custos e garantindo o bem-estar dos seus animais.</p>

                <div className={style.galeria}>
                    <div className={style.card1}>
                        <div className={style.conteudoCard}>
                            <h4 className={style.h4}>🚜 Nosso objetivo</h4>
                            <p>Tudo começou com uma pergunta simples: <i>"Será que temos ração suficiente para a próxima semana?"</i>
                                <br/>
                                Muitos produtores enfrentam desafios no controle dos insumos usados com os animais. Por isso, criamos uma plataforma que une tecnologia e simplicidade para ajudar no dia a dia da fazenda.
                                <br/><br/>  
                                Seja você pequeno ou grande produtor, nosso objetivo é facilitar sua gestão para que possa focar no bem-estar dos animais e no sucesso da produção.🌾
                            </p>
                        </div>
                    </div>

                    <div className={style.card2}>
                        {/*NÃO TIRA DAQUI PLMDS*/}
                    </div>

                    <div className={style.card3}>
                        <div className={style.conteudoCard}>
                            <h4 className={style.h4}>🚀 Como começar a usar?</h4>
                            <p>
                            Para começar a usar a plataforma, basta se <b>cadastrar</b> com seus dados básicos e fazer <b>login</b> para acessar seu painel de controle. 
                            <br/>Em seguida, você pode <b>criar grupos de animais</b> conforme suas categorias, por espécie, e <b>cadastrar as rações consumidas por cada grupo</b>, informando as quantidades necessárias. 
                            <br/><br/>
                            A partir daí, o sistema guarda as informações do consumo e do seu estoque — ajudando você a manter tudo sob controle, de forma simples e organizada.✨
                            </p>
                        </div>
                    </div>
                    
                </div>
                <br/><br/>
                

                <div className={style.galeriaGrupo}>
                    {/* Renderizar ListarGrupos apenas se o usuário estiver autenticado */}
                    {usuario ? (
                        <div></div>
                    ): <center>
                            <p>
                                Pronto para transformar a gestão da sua fazenda?<br/>
                                Cadastre-se grátis e comece hoje mesmo!🌿
                            </p>
                        </center>
                    }
                </div>
            </div>
        </div>
    );
};

export { PagIncial };
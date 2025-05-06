import { Cabecalho, PagIncial, Rodape } from "./components";
import { Router  } from './Router';
import { AuthProvider } from './Context';


const App = () =>{
  return(
    <div>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </div>
  )
}
export default App
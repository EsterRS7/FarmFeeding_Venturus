import { AuthContext } from "../Context";
import { useContext } from "react";

const UseAuthContext = () =>{
    const contexto = useContext(AuthContext);
    return contexto;
};
export { UseAuthContext }; 
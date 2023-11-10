import { createContext } from "react";

export  const   ModalOptions={
    NONE:'none',
    SHARE:'share',
    Create:'create',
    CVIEW:'cview',
    OVIEW:'oview',

}
const ModalContext=createContext({
    
    selectedPassword:null,
    setSelectedPassword:()=>{},
    modal:ModalOptions.NONE,
    setModal:()=>{}
   
})

export default ModalContext
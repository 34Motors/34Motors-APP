import FiltroCategory from "@/components/FilterCategory";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize: any = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <FiltroCategory isMobile={isMobile} />
      <Footer />
    </div>
  );
}

{
  /* <img src="" alt="" /> 

  --se mobile: 
  componente listCards
  button que abre modal filter
  pagination
  --

componente de filtros = {
  <ul>
     <li>
        <h4>Nome categoria</h4>
        <ul>
            <li>
              <button>filtro</button>
            </li>
        </ul>
     </li>
  </ul>
  <></>
}

componente listCards = {
  <aside>
   <ul>
    <li>
        <img src="" alt="" />
        <h7>Nome do carro</h7>
        <p>Descrição do carro</p>
        <div>
           <img src="" alt="" />
           <p>Vendedor</p>
        </div>
        <div>
           <span>km</span>
           <span>Ano</span>
           <h7>Valor</h7>
        </div>
    </li>
  </ul>
  </aside>
  --pagination--
}
*/
}

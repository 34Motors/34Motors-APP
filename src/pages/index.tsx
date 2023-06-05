import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <img src="" alt="" /> 
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
        --pagination--
      }
      */}

      <Footer />
    </main>
  );
}

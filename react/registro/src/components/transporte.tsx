import { FunctionComponent } from 'react';

interface TransporteProps {
  potencia: number;
  ano: number;
  marca: string;
  cor: string;
}

const Transporte: FunctionComponent<TransporteProps> = ({ potencia, ano, marca, cor }) => {
  return (
    <div>
      <h2>Detalhes do Transporte</h2>
      <p>Potência: {potencia}</p>
      <p>Ano: {ano}</p>
      <p>Marca: {marca}</p>
      <p>Cor: {cor}</p>
    </div>
  );
};

export default Transporte;

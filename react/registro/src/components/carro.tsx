import  { FunctionComponent, useState } from 'react';

interface CarroProps {
  acelerar: () => void;
  desacelerar: () => void;
}

const Carro: FunctionComponent<CarroProps> = ({ acelerar, desacelerar }) => {
  const [velocidade, setVelocidade] = useState<number>(0);

  return (
    <div>
      <h2>Detalhes do Carro</h2>
      <p>Velocidade : {velocidade} km/h</p>
      <button onClick={() => {
        acelerar();
        setVelocidade(velocidade + 1);
      }}>
        Acelerar
      </button>
      <button onClick={() => {
        desacelerar();
        setVelocidade(Math.max(velocidade - 1, 0));
      }}>
        Desacelerar
      </button>
    </div>
  );
};

export default Carro;

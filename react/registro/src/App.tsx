import Transporte from './components/transporte';
import Carro from './components/carro';

function App() {
  return (
    <div>
      <Transporte potencia={200} ano={2022} marca="Fiat" cor="Vermelho" />
      <Carro
        acelerar={() => console.log('Acelerando do Carro')}
        desacelerar={() => console.log('Desacelerando do Carro')}
      />
    </div>
  );
}

export default App;

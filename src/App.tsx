import React from 'react';
import './App.css';
import Button from './components/NewButton';
import DataTable from './components/DataTable';
import CalendarButton from './components/CalendarButton';

interface AppProps {
  data: {
    id: number;
    produto: string;
    data: string;
    pagamento: string;
    valor: number;
  }[];
}

const App: React.FC<AppProps> = ({ data }) => {
  const handleButtonClick = () => {
    console.log('Botão clicado!');
  };

  const handleSelectDate = (date: Date) => {
    console.log(`Data selecionada: ${date.toLocaleDateString()}`);
  };

  return (
    <div className="container">      
      <Button onClick={handleButtonClick}>Nova Venda</Button>
      <CalendarButton onSelectDate={handleSelectDate} />
      <DataTable data={data} />
    </div>
  );
};

export default App;
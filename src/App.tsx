import React, { useState } from "react";
import Button from "./components/NewButton";
import DataTable from "./components/DataTable";
import CalendarButton from "./components/CalendarButton";
import { ModalCreateSale } from "./components/ModalCreateSale";
import "./App.css";

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
  const [modalCreate, setModalCreate] = useState<boolean>(false);

  const handleButtonClick = () => {
    setModalCreate(!modalCreate);
  };

  const handleSelectDate = (date: Date) => {
    console.log(`Data selecionada: ${date.toLocaleDateString()}`);
  };

  return (
    <div className="container">
      <Button onClick={handleButtonClick}>Nova Venda</Button>
      <CalendarButton onSelectDate={handleSelectDate} />
      <DataTable data={data} />

      {modalCreate === true ? (
        <ModalCreateSale modalCreate={modalCreate} setModalCreate={setModalCreate} />
      ) : null}
    </div>
  );
};

export default App;

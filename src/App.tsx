import { useState } from "react";
import { Button } from "./components/NewButton";
import { CalendarButton } from "./components/CalendarButton";
import { DataTable } from "./components/DataTable";
import { ModalCreateSale } from "./components/modal/ModalCreateSale";
import "./App.css";

const App = () => {
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
      <DataTable />

      {modalCreate && (
        <ModalCreateSale modalCreate={modalCreate} setModalCreate={setModalCreate} />
      )}
    </div>
  );
};

export default App;

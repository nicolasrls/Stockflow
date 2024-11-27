import React, { useState } from 'react';
import { Button } from './NewButton';
import { CalendarButton } from './CalendarButton';
import { DataTable } from './DataTable';
import { ModalCreateSales } from './modal/ModalCreateSales';
import '../../styles/estoque/Estoque.css'

const Vendas: React.FC = () => {
  const [modalCreate, setModalCreate] = useState<boolean>(false);

  const handleButtonClick = () => {
    setModalCreate(!modalCreate);
  };

  const handleSelectDate = (date: Date) => {
    console.log(`Data selecionada: ${date.toLocaleDateString()}`);
  };

  return (
    <div className="container stock">
      <Button onClick={handleButtonClick}>Nova venda</Button>
      <CalendarButton onSelectDate={handleSelectDate} />
      <DataTable />

      {modalCreate && (
        <ModalCreateSales modalCreate={modalCreate} setModalCreate={setModalCreate} />
      )}
    </div>
  );
};

export default Vendas;

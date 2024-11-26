import React, { useState } from 'react';
import { Button } from './NewButton';
import { CalendarButton } from './CalendarButton';
import { DataTable } from './DataTable';
import { ModalCreateSale } from './modal/ModalCreateSale';
import '../../styles/estoque/Estoque.css'

const Estoque: React.FC = () => {
  const [modalCreate, setModalCreate] = useState<boolean>(false);

  const handleButtonClick = () => {
    setModalCreate(!modalCreate);
  };

  const handleSelectDate = (date: Date) => {
    console.log(`Data selecionada: ${date.toLocaleDateString()}`);
  };

  return (
    <div className="container stock">
      <Button onClick={handleButtonClick}>Nova Venda</Button>
      <CalendarButton onSelectDate={handleSelectDate} />
      <DataTable />

      {modalCreate && (
        <ModalCreateSale modalCreate={modalCreate} setModalCreate={setModalCreate} />
      )}
    </div>
  );
};

export default Estoque;

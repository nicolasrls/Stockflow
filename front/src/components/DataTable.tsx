import React from 'react';
import './DataTable.css';

interface DataTableProps {
  data: {
    id: number;
    produto: string;
    data: string;
    pagamento: string;
    valor: number;
  }[];
}

const DataTable: React.FC<DataTableProps> = () => {
  const data = [
    {
      id: 1,
      produto: 'Produto 1',
      data: '2022-01-01',
      pagamento: 'Cartão de Crédito',
      valor: 100.00,
    },
    {
      id: 2,
      produto: 'Produto 2',
      data: '2022-01-15',
      pagamento: 'Boleto',
      valor: 50.00,
    },
    {
      id: 3,
      produto: 'Produto 3',
      data: '2022-02-01',
      pagamento: 'Pix',
      valor: 200.00,
    },
  ];

  return (
    <table className="data-table">
      <thead>
        <tr className="tr-title">
          <th className="th-first">ID</th>
          <th>Produto</th>
          <th>Data</th>
          <th>Meio de Pagamento</th>
          <th className="th-last">Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.produto}</td>
            <td>{item.data}</td>
            <td>{item.pagamento}</td>
            <td>{item.valor.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
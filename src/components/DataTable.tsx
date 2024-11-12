import { useEffect, useState } from 'react';
import { Sale } from '../types/Sale';
import axios from 'axios';
import './DataTable.css';

const DataTable = () => {
  const [sales, setSales] = useState<Sale[]>([])

  const getSales = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sales");
      const data: Sale[] = response.data;
      setSales(data);
      
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getSales();
  }, [sales]);

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
        {sales.length > 0 ? (
          <>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.name}</td>
                <td>{sale.date}</td>
                <td>{sale.payWay.name}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </>
        ) : (
          <p>Nenhuma venda ainda cadastrada.</p>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
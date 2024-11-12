import { useEffect, useState } from 'react';
import { Sale } from '../types/Sale';
import axios from 'axios';
import './DataTable.css';
import { PayWays } from '../types/PayWays';

const DataTable = () => {
  const [sales, setSales] = useState<Sale[]>([])
  const [payWays, setPayWays] = useState<PayWays[]>([]);

  const getSales = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sales");
      const data: Sale[] = response.data;
      setSales(data);
      
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const getPaysWay = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payWays");
      const data: PayWays[] = response.data;
      setPayWays(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getSales();
    getPaysWay()
  }, [sales]);

  const getPayWayName = (payWayId: string) => {
    const payWay = payWays.find((pay) => pay.id === payWayId);
    return payWay ? payWay.name : "Desconhecido"; // Retorna "Desconhecido" se não encontrar o ID
  };

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
                <td>{getPayWayName(sale.payWay)}</td>
                <td>{sale.price}</td>
              </tr>
            ))}
          </>
        ) : (
          <tr className="none">
            <td colSpan={5}>
              <p>Nenhuma venda ainda cadastrada.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
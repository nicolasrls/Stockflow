import { useEffect, useState } from "react";
import { Sale } from "../../types/Sale";
import { PayWays } from "../../types/PayWays";
import { saleFetch } from "../../api/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ModalEditSale } from "./modal/ModalEditSale";
import "../../styles/estoque/DataTable.css";

export const DataTable = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [payWays, setPayWays] = useState<PayWays[]>([]);
  const [editSaleId, setEditSaleId] = useState<string | null>(null);

  const getSales = async () => {
    try {
      const response = await saleFetch.get("/sales");
      const data: Sale[] = response.data;
      setSales(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const getPaysWay = async () => {
    try {
      const response = await saleFetch.get("/payWays");
      const data: PayWays[] = response.data;
      setPayWays(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getSales();
    getPaysWay();
  }, [sales]);

  const getPayWayName = (payWayId: string) => {
    const payWay = payWays.find((pay) => pay.id === payWayId);
    return payWay ? payWay.name : null;
  };

  const deleteSale = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(
      `Tem certeza que deseja apagar o produto ${sales.map((sale) =>
        sale.id === id ? sale.name : null
      )}?`
    );

    if (confirmDelete) {
      await saleFetch.delete(`/sales/${id}`);

      const filteredSales = sales.filter((sale) => sale.id !== id);

      setSales(filteredSales);
    }
  };

  const closeModal = () => setEditSaleId(null);

  const keyDownEdit = (e: React.KeyboardEvent<SVGElement>, sale: Sale) => {
    if (e.key === "Enter") {
      setEditSaleId(sale.id);
    }
  };

  const keyDownRemove = (e: React.KeyboardEvent<SVGElement>, sale: Sale) => {
    if (e.key === "Enter") {
      deleteSale(sale.id);
    }
  };

  return (
    <>
      <table className="data-table">
        <thead>
          <tr className="tr-title">
            <th className="th-first">ID</th>
            <th>produtoId</th>
            <th>quantidadeVendida</th>
            <th>dataDaVenda</th>
            <th>valorTotal (R$)</th>
            <th className="th-last">Opções</th>
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
                  <td className="ops">
                    <FaEdit
                      className="op"
                      tabIndex={0}
                      onClick={() => setEditSaleId(sale.id)}
                      onKeyDown={(e: React.KeyboardEvent<SVGElement>) => keyDownEdit(e, sale)}
                    />
                    <FaTrash
                      className="op"
                      tabIndex={0}
                      onClick={() => deleteSale(sale.id)}
                      onKeyDown={(e: React.KeyboardEvent<SVGElement>) => keyDownRemove(e, sale)}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr className="none">
              <td colSpan={6}>
                <p>Nenhuma venda ainda cadastrada.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {editSaleId && (
        <ModalEditSale
          modalEdit={!!editSaleId}
          setModalEdit={closeModal}
          idSale={editSaleId}
          nameSale={sales.find((sale) => sale.id === editSaleId)?.name || ""}
        />
      )}
    </>
  );
};

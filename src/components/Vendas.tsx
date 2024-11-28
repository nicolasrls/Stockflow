import React, { useState, useEffect } from 'react';

// Tipos para refletir o backend
interface Venda {
  produtoId: string;
  quantidadeVendida: number;
  valorTotal: number;
  dataDaVenda: string;
}

interface Produto {
  _id: string;
  nome: string;
  preco: number;
}

const Vendas: React.FC = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoId, setProdutoId] = useState<string>('');
  const [quantidadeVendida, setQuantidadeVendida] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar produtos e vendas do backend
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [produtosRes, vendasRes] = await Promise.all([
          fetch('http://127.0.0.1:3030/produtos/'),
          fetch('http://127.0.0.1:3030/vendas/'),
        ]);

        if (!produtosRes.ok || !vendasRes.ok) {
          throw new Error('Erro ao carregar dados.');
        }

        const produtosData = await produtosRes.json();
        const vendasData = await vendasRes.json();

        setProdutos(produtosData);
        setVendas(vendasData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  const registrarVenda = async () => {
    if (!produtoId || quantidadeVendida <= 0) {
      alert('Selecione um produto e insira uma quantidade válida.');
      return;
    }

    const produtoSelecionado = produtos.find((p) => p._id === produtoId);
    if (!produtoSelecionado) {
      alert('Produto inválido.');
      return;
    }

    const novaVenda = {
      produtoId,
      quantidadeVendida,
      valorTotal: produtoSelecionado.preco * quantidadeVendida,
      dataDaVenda: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://127.0.0.1:3030/vendas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaVenda),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar venda.');
      }

      setVendas([...vendas, novaVenda]);
      setProdutoId('');
      setQuantidadeVendida(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Vendas</h1>
      {loading && <p style={styles.loading}>Carregando...</p>}
      {error && <p style={styles.error}>Erro: {error}</p>}

      <div style={styles.card}>
        <h2 style={styles.subHeader}>Registrar Nova Venda</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registrarVenda();
          }}
          style={styles.form}
        >
          <div style={styles.formGroup}>
            <label style={styles.label}>Produto:</label>
            <select
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto._id} value={produto._id}>
                  {produto.nome} - R$ {produto.preco.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Quantidade:</label>
            <input
              type="number"
              value={quantidadeVendida}
              onChange={(e) =>
                setQuantidadeVendida(parseInt(e.target.value) || 1)
              }
              style={styles.input}
              min="1"
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Registrar Venda
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subHeader}>Vendas Realizadas</h2>
        {vendas.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Produto</th>
                <th style={styles.th}>Quantidade</th>
                <th style={styles.th}>Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {new Date(venda.dataDaVenda).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    {
                      produtos.find((produto) => produto._id === venda.produtoId)
                        ?.nome
                    }
                  </td>
                  <td style={styles.td}>{venda.quantidadeVendida}</td>
                  <td style={styles.td}>{venda.valorTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noData}>Nenhuma venda registrada.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center' as const,
  },
  error: {
    color: 'red',
    textAlign: 'center' as const,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  subHeader: {
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  label: {
    fontWeight: 'bold' as const,
  },
  select: {
    padding: '8px',
    fontSize: '16px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left' as const,
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  noData: {
    textAlign: 'center' as const,
    color: '#666',
  },
};

export default Vendas;

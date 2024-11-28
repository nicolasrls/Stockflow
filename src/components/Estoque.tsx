import React, { useState, useEffect } from 'react';

const Estoque: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    quantidadeEmEstoque: '',
  });

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3030/produtos/');
        if (!response.ok) {
          throw new Error('Erro ao buscar os produtos');
        }
        const data = await response.json();
        setProdutos(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleNovoProdutoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3030/produtos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }

      const produtoCriado = await response.json();
      setProdutos([...produtos, produtoCriado]);
      setNovoProduto({
        nome: '',
        preco: '',
        categoria: '',
        quantidadeEmEstoque: '',
      });
      setShowModal(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      padding: '20px',
    },
    button: {
      margin: '10px 0',
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
    },
    formGroup: {
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Estoque de Produtos</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <button
        style={styles.button}
        onClick={() => setShowModal(true)}
      >
        Criar Novo Produto
      </button>
      <ul style={styles.list}>
        {!loading &&
          !error &&
          produtos.map((produto) => (
            <li key={produto.id} style={styles.listItem}>
              {produto.nome} - R$ {produto.preco} -{' '}
              {produto.categoria} - Estoque: {produto.quantidadeEmEstoque}
            </li>
          ))}
      </ul>
      {showModal && (
        <>
          <div style={styles.overlay} onClick={() => setShowModal(false)} />
          <div style={styles.modal}>
            <h2>Criar Novo Produto</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={novoProduto.nome}
                  onChange={handleNovoProdutoChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={novoProduto.preco}
                  onChange={handleNovoProdutoChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="categoria">Categoria</label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  value={novoProduto.categoria}
                  onChange={handleNovoProdutoChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="quantidadeEmEstoque">
                  Quantidade em Estoque
                </label>
                <input
                  type="number"
                  id="quantidadeEmEstoque"
                  name="quantidadeEmEstoque"
                  value={novoProduto.quantidadeEmEstoque}
                  onChange={handleNovoProdutoChange}
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.button}>
                Adicionar Produto
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Estoque;

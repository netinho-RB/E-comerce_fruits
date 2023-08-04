// public/modules/frutas.js

// Função para cadastrar uma nova fruta
export async function cadastrarFruta(nome, preco) {
    // Validar dados
    if (!nome || !preco || isNaN(preco)) {
      console.error('Dados inválidos');
      return;
    }
  
    try {
      const response = await fetch('/api/frutas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, preco })
      });
  
      const data = await response.json();
      console.log(data.message); // Exibir mensagem de sucesso (opcional)
  
      // Atualiza o histórico e o saldo após o cadastro da fruta
      await carregarHistorico();
      await carregarSaldoCliente();
  
      // Limpa o formulário após o cadastro
      document.getElementById('cadastro-frutas').reset();
    } catch (error) {
      console.error('Erro ao cadastrar fruta:', error);
    }
  }
  
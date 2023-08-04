 
import { carregarHistorico, carregarSaldoCliente } from './modules/historico';
import { cadastrarFruta } from './modules/frutas';


const historicoContainer = document.getElementById('historico-container');
const saldoClienteElement = document.getElementById('saldo-cliente');
const cadastroForm = document.getElementById('cadastro-frutas').querySelector('form');

// Função para carregar o histórico de vendas
async function carregarHistorico() {
  try {
    const response = await fetch('/api/historico');
    const data = await response.json();

    historicoContainer.innerHTML = data.map(venda => `
      <div class="venda">
        <p>Data: ${venda.data}</p>
        <p>Valor: R$ ${venda.valor.toFixed(2)}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  }
}

// Função para carregar o saldo do cliente
async function carregarSaldoCliente() {
  try {
    const response = await fetch('/api/cliente');
    const cliente = await response.json();

    saldoClienteElement.textContent = `Saldo do Cliente: R$ ${cliente.saldo.toFixed(2)}`;
  } catch (error) {
    console.error('Erro ao carregar saldo do cliente:', error);
  }
}

const cadastroForm = document.getElementById('cadastro-frutas').querySelector('form');
cadastroForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  cadastrarFruta(nome, preco);
});
  
  // ...

function toggleForm() {
  const form = document.getElementById('cadastro-frutas');
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

// ...

 
// Função para cadastrar uma nova fruta
async function cadastrarFruta() {
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);

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
    cadastroForm.reset();
  } catch (error) {
    console.error('Erro ao cadastrar fruta:', error);
  }
}

// Carregar histórico e saldo do cliente ao carregar a página
window.onload = async () => {
  await carregarHistorico();
  await carregarSaldoCliente();
};

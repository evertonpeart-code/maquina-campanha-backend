document.getElementById('form-campanha').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id_google_ads = document.getElementById('id_google_ads').value;
  const url_produto = document.getElementById('url_produto').value;
  const url_afiliado = document.getElementById('url_afiliado').value;

  const respostaDiv = document.getElementById('resposta');
  respostaDiv.innerHTML = '🔄 Gerando campanha com IA... Aguarde...';

  try {
    const response = await fetch('/api/gerar-campanha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_google_ads, url_produto, url_afiliado }),
    });

    const data = await response.json();

    if (data.sucesso) {
      respostaDiv.innerHTML = `
        <h3>✅ Campanha gerada com sucesso!</h3>
        <pre style="white-space:pre-wrap;background:#f4f4f4;padding:10px;border-radius:5px;">${data.csv}</pre>
      `;
    } else {
      respostaDiv.innerHTML = '❌ Erro ao gerar campanha.';
    }
  } catch (erro) {
    console.error(erro);
    respostaDiv.innerHTML = '❌ Erro na requisição.';
  }
});

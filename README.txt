PASSO A PASSO PARA SUBIR NA RENDER (sem GitHub):

1. Vá em: https://dashboard.render.com/
2. Clique em "New → Web Service"
3. Clique em: "Manual Deploy → Create Web Service"
4. Preencha assim:
   - Name: maquina-campanha-ia
   - Environment: Node
   - Build Command: (deixe VAZIO)
   - Start Command: node server.js
   - Root Directory: (deixe em branco)
5. Clique em “Upload .ZIP” e envie este arquivo.
6. Crie a variável de ambiente:
   - Key: OPENAI_API_KEY
   - Value: sua chave da OpenAI (ex: sk-...)
7. Clique em DEPLOY e aguarde rodar.

Depois acesse o link que a Render mostrar no topo (ex: https://maquina-campanha.onrender.com)
# Stockflow
Projeto da cadeira de Programação com frameworks Web do prof. Jeofton Costa.

### V1.0 - versão inicial

Começando pelo começo, estudei a respeito do token JWT, suas funcionalidades e aprendi acerca da geração. Também estudando sobre o 2FA, consegui implementar a geração do QR Code para ser utilizado com uma outra solução de autenticação(Authy ou Google Authenticator por ex.) e também obtive sucesso na validação do segredo gerado. Seguirei aprimorando a interface inicial de login/cadastro para garantir pleno funcionamento de uma das partes fundamentais do nosso projeto. A expectativa é que na versão 1.05 eu traga a tela de cadastro já funcional e capaz de armazenar os dados de autenticação no banco MongoDB(requisito para entrega do projeto.) - Nícolas R.

### V1.05 - 

##### correção de bugs da V1.0 em relação ao 2FA
Backend de registro e login com integração a banco de dados NoSQL realizada utilizando o mongoose. Implementação de 2FA realizada com sucesso onde é possível registrar a semente em um aplicativo autenticador e a cada login, fazer a validação; Por ora, esperamos implementar as telas principais do nosso projeto para em seguida darmos continuidade. - Nícolas R.


### V1.06 -

# configurações de ambiente do projeto, todas as instalações utilizadas até então...

## Instalações Necessárias

Siga os passos abaixo para configurar o ambiente e rodar o projeto corretamente.

### 1. Instalar o Node.js
   - Baixe e instale a versão mais recente do [Node.js](https://nodejs.org/). Isso também instala o npm (gerenciador de pacotes).

### 2. Instalar as Dependências do Projeto
   Após clonar o repositório, execute o comando:
   ```bash
   npm install
   ```

### 3. Instalar o React Router
   Para gerenciar as rotas na aplicação, instale o React Router:
   ```bash
   npm install react-router-dom
   ```

### 4. Instalar TypeScript e Tipagens
   Certifique-se de que o TypeScript e suas tipagens estão instalados:
   ```bash
   npm install typescript @types/react @types/react-dom
   ```

### 5. Instalar Tipagens do React Router
   Adicione as tipagens do React Router para TypeScript:
   ```bash
   npm install @types/react-router-dom
   ```

### 6. Iniciar o Projeto
   Após as instalações, inicie o servidor de desenvolvimento com o comando:
   ```bash
   npm start
   ```

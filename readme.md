# Stockflow
Projeto da cadeira de Programação com frameworks Web do prof. Jeofton Costa.

### V1.0 - versão inicial

Começando pelo começo, estudei a respeito do token JWT, suas funcionalidades e aprendi acerca da geração. Também estudando sobre o 2FA, consegui implementar a geração do QR Code para ser utilizado com uma outra solução de autenticação(Authy ou Google Authenticator por ex.) e também obtive sucesso na validação do segredo gerado. Seguirei aprimorando a interface inicial de login/cadastro para garantir pleno funcionamento de uma das partes fundamentais do nosso projeto. A expectativa é que na versão 1.05 eu traga a tela de cadastro já funcional e capaz de armazenar os dados de autenticação no banco MongoDB(requisito para entrega do projeto.) - Nícolas R.

### V1.05 - 

##### correção de bugs da V1.0 em relação ao 2FA
Backend de registro e login com integração a banco de dados NoSQL realizada utilizando o mongoose. Implementação de 2FA realizada com sucesso onde é possível registrar a semente em um aplicativo autenticador e a cada login, fazer a validação; Por ora, esperamos implementar as telas principais do nosso projeto para em seguida darmos continuidade. - Nícolas R.

### V1.10 - 

##### Integração API + React

Feito integração da API de Login e Registro com o front-end desenvolvido pelo colega Gabriel Moura. Algumas correções e melhorias de código precisam ser feitas para corrigir alguns eventuais bugs, apesar disso o projeto segue funcional e integrado ao banco MongoDB. Parte de 2FA funcionando perfeitamente integrado ao Authy. Versões seguintes devem ser registradas nesse README, pelos colegas que estão presentes no trabalho, relatando o incremento de funções do projeto. - Nícolas R. 
# AppFIAP Mobile - Documentação Técnica

## 1. Configuração Inicial

O aplicativo móvel AppFIAP é construído usando React Native. Antes de executar o aplicativo, certifique-se de ter o ambiente necessário configurado. Isso inclui Node.js, npm (ou yarn) e o React Native CLI. Você também precisará de um ambiente de desenvolvimento móvel adequado (Android Studio/Xcode), dependendo da plataforma de destino.

### Passos para configuração:

1. **Clonar o repositório:**
   Clone o repositório AppFIAP para sua máquina local:
   ```bash
   git clone https://github.com/EdgardCJr/TechChallengIV
   cd appfiap
   ```

2. **Instalar dependências:**
   Navegue até o diretório `appfiap` e execute:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   Vá até o reprositorio https://github.com/EdgardCJr/BackEnd e siga as instruções do **README.txt**

4. **Executar o aplicativo:**
   - Conecte um dispositivo físico ou inicie um emulador.
   - Em uma janela de terminal separada, navegue até o diretório `appfiap` e execute:
     ```bash
     # para android
     npx react-native run-android
     # ou, para iOS:
     npx react-native run-ios
     # ou , para expo
     npm expo start
     ```

## 2. Arquitetura da Aplicação

O aplicativo móvel AppFIAP segue uma arquitetura baseada em componentes usando React Native. Os principais aspectos da arquitetura incluem:

### **Telas (Screens):**
A interface do usuário é dividida em telas, cada uma representando uma funcionalidade distinta, como:
- **LoginScreen:** Tela de login.
- **MainPostListScreen:** Exibição de lista de posts.
- **CreatePostScreen:** Criação de novos posts.
- **EditPostScreen:** Edição de posts existentes.
- **UserManagementScreen:** Gerenciamento de contas de usuários.
- **AdminDashboardScreen:** Painel administrativo para professores.

### **Componentes (Components):**
Elementos reutilizáveis da interface do usuário encapsulados como componentes. Exemplos incluem botões e formulários.

### **Serviços (Services):**
Funções essenciais como chamadas de API e autenticação. Exemplos:
- **`apiService.ts`:** Centraliza as solicitações de rede.
- **`authContext.ts`:** Gerencia a autenticação.

### **Navegação (Navigation):**
Gerenciada usando React Navigation, oferecendo navegação baseada em pilha e guias para diferentes seções do aplicativo.

### **Gerenciamento de Estado (State Management):**
Utiliza hooks do React como `useState` e `useEffect` para gerenciar os dados do aplicativo.

## 3. Guia de Uso do Aplicativo

### **Login:**
-Na tela inicial (LoginScreen), os usuários inserem suas credenciais para acessar o aplicativo.
-Em caso de uso da base ja chamada na aplicação Backend
-
- Para acesso a todas as funcionalidade

```bash
 Login : ProfessorTeste
 Senha : Teste
 ```
- Para acesso somente as postagens
- 
```bash
 Login : AlunoTeste
 Senha : Teste
 ``` 
### **Postagens:**
- **Visualizar:** Os posts são exibidos na MainPostListScreen. É possível pesquisar por título, conteúdo ou autor.
- Possivel acessar pagina da postagem ao clicar na postagem 
### **Painel Administrativo:**
Professores acessam a AdminDashboardScreen para:
- Gerenciar postagens.
- **Criar:** Use a CreatePostScreen para criar novos posts.
- **Editar:** Modificação de posts existentes na EditPostScreen.
- **Excluir:** Professores podem excluir posts diretamente no painel administrativo.
- Acessar funcionalidades de gerenciamento de usuários.

### **Gerenciamento de Usuários:**
- **Visualizar:** Lista de usuários no UserManagementScreen.
- **Criar/Editar Usuários:** Uso das telas CreateUserScreen e EditUserScreen para criar ou modificar contas.

## 4. Considerações Adicionais

- **Segurança:** Certifique-se de seguir boas práticas, como criptografia de senhas e proteção de endpoints.
- **Validação de Dados:** Garanta que entradas sejam validadas tanto no frontend quanto no backend.
- **Escalabilidade:** A arquitetura atual é adequada para uso moderado, mas pode exigir ajustes para atender a demandas maiores.

---
Esta documentação fornece um guia abrangente para configuração e uso do AppFIAP. Consulte o código-fonte e os comentários para detalhes adicionais.


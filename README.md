# Florestal Map - Sistema de Monitoramento de Equipamentos

## Visão Geral do Projeto
O Florestal Map é um sistema de monitoramento de equipamentos desenvolvido como teste técnico para a Aiko. A aplicação permite o acompanhamento em tempo real do status e da produtividade de diferentes equipamentos.

### Funcionalidades Principais
- Monitoramento de status de equipamentos (Em Andamento, Parado, Manutenção)
- Filtros de busca por nome e status de equipamento
- Visualização detalhada da produtividade individual
- Histórico temporal de alterações de status
- Interface intuitiva e responsiva

### Demo
Acesse a demonstração em produção: [Florestal Map](https://florestal-map.vercel.app)

## Guia de Instalação

### Instalação Manual
#### Pré-requisitos
- Node.js (versão 16.x ou superior)
- NPM (versão 8.x ou superior)

#### Passos
1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd florestal_map
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Instalação com Docker
#### Pré-requisitos
- Docker (versão 20.x ou superior)
- Docker Compose (versão 2.x ou superior)

#### Passos
1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd florestal_map
```

2. Construa e execute os containers:
```bash
docker compose up -d
```

3. Para parar os containers:
```bash
docker compose down
```

## Instruções de Desenvolvimento

### Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção
- `npm run preview`: Visualiza a versão de produção localmente

### Configurações
- Porta padrão: 3000
- Para alterar a porta, ajuste a variável PORT no arquivo .env

## Melhorias Futuras

### Testes
- Implementação de testes unitários com Jest
- Testes de integração com Cypress
- Testes de componentes com Vue Test Utils

### Design e UX
- Aprimoramento da interface da página de detalhes do equipamento
- Implementação de mais gráficos e visualizações de dados
- Melhorias na responsividade e acessibilidade

### Arquitetura e Código
- Refatoração para melhor separação entre lógica de negócio e componentes visuais
- Implementação de uma arquitetura mais escalável
- Criação de componentes mais reutilizáveis
- Melhor organização do estado da aplicação
- Implementação de TypeScript para maior segurança de tipos

## Tecnologias Utilizadas
- Nuxt.js
- Vue.js
- Pinia (gerenciamento de estado)
- Tailwind CSS
- Nuxt/ui@2 (Biblioteca de componentes)
- Leaflet (Mapa)


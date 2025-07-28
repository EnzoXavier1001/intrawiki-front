# 📚 IntraWiki

**IntraWiki** é uma plataforma interna de blog desenvolvida para facilitar o compartilhamento de conhecimento entre equipes. Ideal para registrar tutoriais, processos, boas práticas e aprendizados técnicos, tudo de forma organizada, responsiva e com uma ótima experiência de uso.

---

## 🚀 Tecnologias Utilizadas

- **React** – Biblioteca para construção de interfaces modernas.
- **TypeScript** – Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS** – Estilização com classes utilitárias.
- **Vitest** – Testes rápidos e integrados com o Vite.
- **React Hook Form** – Manipulação eficiente de formulários.
- **Zod** – Validação de dados com schemas.
- **React Router** – Gerenciamento de rotas.
- **Markdown** – Suporte a conteúdo rico e formatado.
- **Cloudinary** – Upload de imagens (avatars e imagens dos posts).

---

## ✨ Funcionalidades

- 🔐 Login com JWT e controle de acesso
- 📝 Criação e edição de posts com editor em Markdown
- 👀 Visualização com aba de Preview em tempo real
- 🏷️ Tags e categorias para organização de conteúdo
- 🙋‍♂️ Perfil de usuário com avatar, biografia, habilidades, hobbies e badges
- 🔎 Busca de posts por título
- 💡 Página de posts com destaque visual e responsividade
- ✅ Testes automatizados com Vitest

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/intrawiki.git
cd intrawiki
pnpm install
```

---

## ▶️ Execução

```bash
pnpm dev
```

---

## 🧪 Rodando os testes

```bash
pnpm test
```

---

## 🔧 Variáveis de ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```
VITE_API_URL=https://sua-api.com
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/...
VITE_CLOUDINARY_PRESET=seu_preset
```

---

## 🗂️ Estrutura do Projeto

```
src/
├── api/              # Arquivos de requisição HTTP (axios)
├── components/       # Componentes reutilizáveis
├── hooks/            # Hooks customizados
├── pages/            # Páginas (Home, Post, Perfil etc.)
├── routes/           # Configuração de rotas
├── styles/           # Estilos globais
├── types/            # Tipagens globais
├── utils/            # Utilitários
└── tests/            # Testes automatizados
```

---

## 🧑‍💻 Contribuindo

Pull requests são bem-vindos! Para grandes mudanças, por favor abra uma issue antes para discutirmos o que você gostaria de alterar.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**IntraWiki** — Compartilhe conhecimento. Construa cultura. 🚀
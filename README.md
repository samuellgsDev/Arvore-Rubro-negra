# 🌲 Árvore Rubro-Negra - Visualizador Interativo

Um visualizador interativo e didático de Árvore Rubro-Negra (Red-Black Tree) desenvolvido com JavaScript puro, HTML5 Canvas e CSS. Este projeto permite visualizar em tempo real as operações de inserção, busca e remoção, além das rotações e recolorações que mantêm o balanceamento da árvore.

## 📋 Sobre o Projeto

Árvores Rubro-Negras são estruturas de dados auto-balanceadas que garantem operações de busca, inserção e remoção em tempo O(log n). Este visualizador foi criado para fins educacionais, permitindo que estudantes e desenvolvedores compreendam visualmente como essas operações funcionam.

### Propriedades da Árvore Rubro-Negra

1. Todo nó é vermelho ou preto
2. A raiz é sempre preta
3. Todas as folhas (NIL) são pretas
4. Se um nó é vermelho, seus filhos são pretos
5. Todo caminho de um nó até suas folhas descendentes contém o mesmo número de nós pretos

## ✨ Funcionalidades

- **Inserção de valores**: Adicione valores individuais ou aleatórios
- **Busca de elementos**: Visualize o caminho percorrido durante a busca
- **Remoção de nós**: Observe as rotações e recolorações necessárias
- **Animações em tempo real**: Acompanhe cada passo das operações
- **Controle de velocidade**: Ajuste a velocidade das animações
- **Exemplo didático**: Carregue um exemplo pré-configurado para aprendizado
- **Percursos da árvore**: Visualize percursos in-order, pré-order e pós-order
- **Verificação de propriedades**: Valide se a árvore mantém suas propriedades
- **Estatísticas**: Veja informações como número de nós, altura e altura preta
- **Log de operações**: Acompanhe todas as ações realizadas

## 🚀 Como Usar

### Executando o Projeto

1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/arvore-binaria.git
cd arvore-binaria
```

2. Abra o arquivo `index.html` em um navegador moderno:
   - Dê duplo clique no arquivo `index.html`, ou
   - Use um servidor local como Live Server (VS Code) ou Python:
```bash
# Com Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Operações Disponíveis

- **Inserir valor**: Digite um número e clique em "Inserir"
- **Buscar valor**: Digite um número e clique em "Buscar" para visualizar o caminho
- **Remover valor**: Digite um número e clique em "Remover"
- **Inserir aleatório**: Adiciona um valor aleatório à árvore
- **Exemplo didático**: Carrega uma árvore de exemplo com valores pré-definidos
- **Verificar propriedades**: Valida se todas as propriedades são mantidas
- **Limpar árvore**: Remove todos os nós da árvore

### Controles

- Use o controle deslizante para ajustar a velocidade das animações
- Clique nos botões de percurso para visualizar diferentes ordens de travessia
- Acompanhe as estatísticas em tempo real no painel de informações

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e layout responsivo
- **JavaScript (ES6+)**: Lógica da árvore e animações
- **Canvas API**: Renderização gráfica da árvore

## 📁 Estrutura do Projeto

```
arvore-binaria/
├── index.html          # Página principal
├── README.md           # Documentação do projeto
├── css/
│   └── styles.css      # Estilos da aplicação
└── js/
    ├── main.js         # Controlador principal e eventos
    ├── node.js         # Classe Node (nó da árvore)
    ├── redblacktree.js # Implementação da Árvore Rubro-Negra
    └── visualizer.js   # Renderização gráfica com Canvas
```

## 🎓 Conceitos Implementados

### Rotações

- **Rotação à esquerda**: Reorganiza a árvore quando necessário após inserções/remoções
- **Rotação à direita**: Balanceia a árvore mantendo as propriedades

### Recoloração

Após inserções e remoções, a árvore pode precisar recolorir nós para manter as propriedades da Árvore Rubro-Negra.

### Balanceamento

A árvore mantém-se balanceada automaticamente, garantindo altura logarítmica.

## 📊 Complexidade das Operações

| Operação | Complexidade de Tempo | Complexidade de Espaço |
|----------|----------------------|------------------------|
| Busca    | O(log n)            | O(1)                   |
| Inserção | O(log n)            | O(1)                   |
| Remoção  | O(log n)            | O(1)                   |

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Desenvolvido para fins educacionais e de aprendizado sobre estruturas de dados.

## 🔗 Referências

- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/books/introduction-algorithms-third-edition) - Capítulo sobre Árvores Rubro-Negras
- [Visualgo](https://visualgo.net/) - Visualização de algoritmos e estruturas de dados
- [GeeksforGeeks - Red-Black Tree](https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

/**
 * Script principal - Controle da interface
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a árvore e o visualizador
    const tree = new RedBlackTree();
    const visualizer = new TreeVisualizer('treeCanvas');

    // Elementos DOM
    const insertInput = document.getElementById('insertValue');
    const insertBtn = document.getElementById('insertBtn');
    const searchInput = document.getElementById('searchValue');
    const searchBtn = document.getElementById('searchBtn');
    const deleteInput = document.getElementById('deleteValue');
    const deleteBtn = document.getElementById('deleteBtn');
    const randomBtn = document.getElementById('randomBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const logContent = document.getElementById('logContent');
    const nodeCount = document.getElementById('nodeCount');
    const treeHeight = document.getElementById('treeHeight');
    const blackHeight = document.getElementById('blackHeight');
    const inOrderBtn = document.getElementById('inOrderBtn');
    const preOrderBtn = document.getElementById('preOrderBtn');
    const postOrderBtn = document.getElementById('postOrderBtn');
    const traversalResult = document.getElementById('traversalResult');
    const verificationStatus = document.getElementById('verificationStatus');

    // Flag para controlar animações
    let isAnimating = false;

    /**
     * Adiciona entrada no log
     */
    function addLog(message, type = 'info') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContent.insertBefore(entry, logContent.firstChild);
        
        // Limita o número de entradas no log
        while (logContent.children.length > 50) {
            logContent.removeChild(logContent.lastChild);
        }
    }

    /**
     * Atualiza as informações da árvore
     */
    function updateInfo() {
        nodeCount.textContent = tree.count();
        treeHeight.textContent = tree.height() + 1;
        blackHeight.textContent = calculateBlackHeight(tree.root);
    }

    /**
     * Calcula a altura negra da árvore
     */
    function calculateBlackHeight(node) {
        if (node === null) return 0;
        
        let height = 0;
        let current = node;
        
        while (current !== null) {
            if (current.isBlack()) height++;
            current = current.left;
        }
        
        return height;
    }

    /**
     * Desenha a árvore
     */
    function drawTree(highlightValue = null) {
        visualizer.drawTree(tree, highlightValue);
        updateInfo();
    }

    /**
     * Anima os passos de uma operação
     */
    async function animateOperation() {
        if (tree.animationSteps.length === 0) return;
        
        isAnimating = true;
        disableButtons(true);
        
        await visualizer.animateSteps(tree.animationSteps, (message, type) => {
            addLog(message, type);
        });
        
        isAnimating = false;
        disableButtons(false);
        drawTree();
    }

    /**
     * Desabilita/habilita botões durante animação
     */
    function disableButtons(disabled) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.disabled = disabled;
            btn.style.opacity = disabled ? '0.6' : '1';
        });
    }

    /**
     * Operação de inserção
     */
    async function insert() {
        const value = parseInt(insertInput.value);
        
        if (isNaN(value)) {
            addLog('Por favor, insira um número válido', 'error');
            return;
        }
        
        tree.insert(value);
        insertInput.value = '';
        
        await animateOperation();
    }

    /**
     * Operação de busca
     */
    async function search() {
        const value = parseInt(searchInput.value);
        
        if (isNaN(value)) {
            addLog('Por favor, insira um número válido para buscar', 'error');
            return;
        }
        
        const result = tree.search(value);
        searchInput.value = '';
        
        await animateOperation();
        
        if (result) {
            drawTree(value);
            setTimeout(() => drawTree(), 2000);
        }
    }

    /**
     * Operação de remoção
     */
    async function remove() {
        const value = parseInt(deleteInput.value);
        
        if (isNaN(value)) {
            addLog('Por favor, insira um número válido para remover', 'error');
            return;
        }
        
        tree.delete(value);
        deleteInput.value = '';
        
        await animateOperation();
    }

    /**
     * Insere valor aleatório
     */
    async function insertRandom() {
        const value = Math.floor(Math.random() * 100) + 1;
        tree.insert(value);
        await animateOperation();
    }

    /**
     * Insere exemplo didático
     */
    async function insertExample() {
        tree.clear();
        drawTree();
        addLog('Inserindo exemplo didático...', 'info');
        
        const values = [50, 25, 75, 10, 30, 60, 80, 5, 15, 27, 35];
        
        for (const value of values) {
            tree.insert(value);
            await animateOperation();
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        addLog('Exemplo didático concluído!', 'success');
    }

    /**
     * Verifica as propriedades da árvore
     */
    function verify() {
        const result = tree.verify();
        
        verificationStatus.style.display = 'block';
        
        if (result.valid) {
            verificationStatus.className = 'verification-status valid';
            verificationStatus.innerHTML = '✅ Todas as propriedades Rubro-Negra são válidas!';
            addLog('Verificação: Árvore válida!', 'found');
        } else {
            verificationStatus.className = 'verification-status invalid';
            verificationStatus.innerHTML = '❌ Violações encontradas:<br>' + 
                result.errors.map(e => `• ${e}`).join('<br>');
            result.errors.forEach(error => addLog(`Violação: ${error}`, 'error'));
        }
        
        setTimeout(() => {
            verificationStatus.style.display = 'none';
        }, 5000);
    }

    /**
     * Limpa a árvore
     */
    function clear() {
        tree.clear();
        drawTree();
        addLog('Árvore limpa', 'delete');
        traversalResult.textContent = 'Clique em um botão de percurso para visualizar';
    }

    /**
     * Exibe percurso em ordem
     */
    function showInOrder() {
        const result = tree.inOrder();
        displayTraversal(result, 'Em Ordem');
    }

    /**
     * Exibe percurso em pré-ordem
     */
    function showPreOrder() {
        const result = tree.preOrder();
        displayTraversal(result, 'Pré-Ordem');
    }

    /**
     * Exibe percurso em pós-ordem
     */
    function showPostOrder() {
        const result = tree.postOrder();
        displayTraversal(result, 'Pós-Ordem');
    }

    /**
     * Exibe resultado do percurso
     */
    function displayTraversal(nodes, type) {
        if (nodes.length === 0) {
            traversalResult.innerHTML = 'Árvore vazia';
            return;
        }
        
        traversalResult.innerHTML = `<strong>${type}:</strong> ` +
            nodes.map(n => 
                `<span class="node-item ${n.color.toLowerCase()}">${n.value}</span>`
            ).join(' → ');
        
        addLog(`Percurso ${type}: ${nodes.map(n => n.value).join(', ')}`, 'info');
    }

    /**
     * Atualiza velocidade da animação
     */
    function updateSpeed() {
        const speed = parseInt(speedSlider.value);
        speedValue.textContent = speed;
        visualizer.setAnimationSpeed(speed);
    }

    // Event Listeners
    insertBtn.addEventListener('click', insert);
    insertInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') insert();
    });

    searchBtn.addEventListener('click', search);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') search();
    });

    deleteBtn.addEventListener('click', remove);
    deleteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') remove();
    });

    randomBtn.addEventListener('click', insertRandom);
    exampleBtn.addEventListener('click', insertExample);
    verifyBtn.addEventListener('click', verify);
    clearBtn.addEventListener('click', clear);
    
    inOrderBtn.addEventListener('click', showInOrder);
    preOrderBtn.addEventListener('click', showPreOrder);
    postOrderBtn.addEventListener('click', showPostOrder);
    
    speedSlider.addEventListener('input', updateSpeed);

    // Desenha árvore inicial (vazia)
    drawTree();
    
    addLog('Sistema inicializado. Pronto para operações!', 'info');
});

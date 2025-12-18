/**
 * Classe que representa uma Árvore Rubro-Negra
 * 
 * Propriedades da Árvore Rubro-Negra:
 * 1. Todo nó é vermelho ou preto
 * 2. A raiz é sempre preta
 * 3. Todas as folhas (NIL) são pretas
 * 4. Se um nó é vermelho, seus filhos são pretos
 * 5. Todo caminho de um nó até suas folhas descendentes contém
 *    o mesmo número de nós pretos
 */
class RedBlackTree {
    constructor() {
        this.root = null;
        this.animationSteps = [];
    }

    /**
     * Limpa os passos de animação
     */
    clearAnimationSteps() {
        this.animationSteps = [];
    }

    /**
     * Adiciona um passo de animação
     */
    addAnimationStep(type, node, message) {
        this.animationSteps.push({
            type: type,
            nodeValue: node ? node.value : null,
            message: message,
            treeState: this.getTreeState()
        });
    }

    /**
     * Retorna o estado atual da árvore para visualização
     */
    getTreeState() {
        return this.serializeTree(this.root);
    }

    /**
     * Serializa a árvore para um objeto
     */
    serializeTree(node) {
        if (node === null) return null;
        return {
            value: node.value,
            color: node.color,
            left: this.serializeTree(node.left),
            right: this.serializeTree(node.right)
        };
    }

    /**
     * Rotação à esquerda
     */
    rotateLeft(node) {
        const rightChild = node.right;
        node.right = rightChild.left;

        if (rightChild.left !== null) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (node.parent === null) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;

        this.addAnimationStep('rotate-left', node, `Rotação à esquerda no nó ${node.value}`);
    }

    /**
     * Rotação à direita
     */
    rotateRight(node) {
        const leftChild = node.left;
        node.left = leftChild.right;

        if (leftChild.right !== null) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (node.parent === null) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;

        this.addAnimationStep('rotate-right', node, `Rotação à direita no nó ${node.value}`);
    }

    /**
     * Insere um novo valor na árvore
     */
    insert(value) {
        this.clearAnimationSteps();
        
        const newNode = new RBNode(value);
        this.addAnimationStep('create', newNode, `Criando nó ${value} (vermelho)`);

        if (this.root === null) {
            this.root = newNode;
            this.root.color = RBNode.BLACK;
            this.addAnimationStep('color-black', newNode, `Nó ${value} é a raiz, colorindo de preto`);
            return newNode;
        }

        // Inserção BST padrão
        let current = this.root;
        let parent = null;

        while (current !== null) {
            parent = current;
            this.addAnimationStep('compare', current, `Comparando ${value} com ${current.value}`);
            
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                this.addAnimationStep('duplicate', current, `Valor ${value} já existe na árvore`);
                return null; // Valor duplicado
            }
        }

        newNode.parent = parent;
        if (value < parent.value) {
            parent.left = newNode;
            this.addAnimationStep('insert-left', newNode, `Inserindo ${value} à esquerda de ${parent.value}`);
        } else {
            parent.right = newNode;
            this.addAnimationStep('insert-right', newNode, `Inserindo ${value} à direita de ${parent.value}`);
        }

        // Corrigir violações
        this.fixInsert(newNode);

        return newNode;
    }

    /**
     * Corrige as violações das propriedades após inserção
     */
    fixInsert(node) {
        while (node !== this.root && node.parent.isRed()) {
            const uncle = node.uncle();
            const grandparent = node.grandparent();

            if (node.parent === grandparent.left) {
                // Pai é filho esquerdo do avô
                if (uncle !== null && uncle.isRed()) {
                    // Caso 1: Tio é vermelho
                    this.addAnimationStep('case1', node, `Caso 1: Tio ${uncle.value} é vermelho - recolorindo`);
                    node.parent.color = RBNode.BLACK;
                    uncle.color = RBNode.BLACK;
                    grandparent.color = RBNode.RED;
                    node = grandparent;
                } else {
                    // Caso 2: Tio é preto e nó é filho direito
                    if (node === node.parent.right) {
                        this.addAnimationStep('case2', node, `Caso 2: Nó ${node.value} é filho direito - rotação esquerda`);
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    // Caso 3: Tio é preto e nó é filho esquerdo
                    this.addAnimationStep('case3', node, `Caso 3: Recolorindo e rotação direita`);
                    node.parent.color = RBNode.BLACK;
                    grandparent.color = RBNode.RED;
                    this.rotateRight(grandparent);
                }
            } else {
                // Pai é filho direito do avô (casos espelhados)
                if (uncle !== null && uncle.isRed()) {
                    // Caso 1: Tio é vermelho
                    this.addAnimationStep('case1', node, `Caso 1: Tio ${uncle.value} é vermelho - recolorindo`);
                    node.parent.color = RBNode.BLACK;
                    uncle.color = RBNode.BLACK;
                    grandparent.color = RBNode.RED;
                    node = grandparent;
                } else {
                    // Caso 2: Tio é preto e nó é filho esquerdo
                    if (node === node.parent.left) {
                        this.addAnimationStep('case2', node, `Caso 2: Nó ${node.value} é filho esquerdo - rotação direita`);
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    // Caso 3: Tio é preto e nó é filho direito
                    this.addAnimationStep('case3', node, `Caso 3: Recolorindo e rotação esquerda`);
                    node.parent.color = RBNode.BLACK;
                    grandparent.color = RBNode.RED;
                    this.rotateLeft(grandparent);
                }
            }
        }

        // Garantir que a raiz seja preta
        if (this.root.color === RBNode.RED) {
            this.root.color = RBNode.BLACK;
            this.addAnimationStep('root-black', this.root, 'Colorindo raiz de preto');
        }
    }

    /**
     * Busca um valor na árvore
     */
    search(value) {
        this.clearAnimationSteps();
        let current = this.root;

        while (current !== null) {
            this.addAnimationStep('search', current, `Verificando nó ${current.value}`);
            
            if (value === current.value) {
                this.addAnimationStep('found', current, `Valor ${value} encontrado!`);
                return current;
            } else if (value < current.value) {
                this.addAnimationStep('search-left', current, `${value} < ${current.value}, indo para esquerda`);
                current = current.left;
            } else {
                this.addAnimationStep('search-right', current, `${value} > ${current.value}, indo para direita`);
                current = current.right;
            }
        }

        this.addAnimationStep('not-found', null, `Valor ${value} não encontrado`);
        return null;
    }

    /**
     * Encontra o nó com valor mínimo a partir de um nó
     */
    minimum(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    /**
     * Substitui um nó por outro
     */
    transplant(u, v) {
        if (u.parent === null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v !== null) {
            v.parent = u.parent;
        }
    }

    /**
     * Remove um valor da árvore
     */
    delete(value) {
        this.clearAnimationSteps();
        const node = this.searchNode(value);
        
        if (node === null) {
            this.addAnimationStep('not-found', null, `Valor ${value} não encontrado para remoção`);
            return false;
        }

        this.addAnimationStep('delete-start', node, `Iniciando remoção do nó ${value}`);
        this.deleteNode(node);
        return true;
    }

    /**
     * Busca um nó sem animação
     */
    searchNode(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return current;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    /**
     * Remove um nó da árvore
     */
    deleteNode(z) {
        let y = z;
        let yOriginalColor = y.color;
        let x;
        let xParent;

        if (z.left === null) {
            x = z.right;
            xParent = z.parent;
            this.transplant(z, z.right);
        } else if (z.right === null) {
            x = z.left;
            xParent = z.parent;
            this.transplant(z, z.left);
        } else {
            y = this.minimum(z.right);
            yOriginalColor = y.color;
            x = y.right;
            
            if (y.parent === z) {
                xParent = y;
            } else {
                xParent = y.parent;
                this.transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            
            this.transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }

        this.addAnimationStep('delete', z, `Nó ${z.value} removido`);

        if (yOriginalColor === RBNode.BLACK) {
            this.fixDelete(x, xParent);
        }
    }

    /**
     * Corrige as violações das propriedades após remoção
     */
    fixDelete(x, xParent) {
        while (x !== this.root && (x === null || x.isBlack())) {
            if (xParent === null) break;
            
            if (x === xParent.left) {
                let w = xParent.right;
                
                if (w !== null && w.isRed()) {
                    this.addAnimationStep('fix-delete-case1', w, 'Caso 1: Irmão vermelho');
                    w.color = RBNode.BLACK;
                    xParent.color = RBNode.RED;
                    this.rotateLeft(xParent);
                    w = xParent.right;
                }
                
                if (w === null || ((w.left === null || w.left.isBlack()) && 
                    (w.right === null || w.right.isBlack()))) {
                    this.addAnimationStep('fix-delete-case2', w, 'Caso 2: Irmão preto com filhos pretos');
                    if (w !== null) w.color = RBNode.RED;
                    x = xParent;
                    xParent = x.parent;
                } else {
                    if (w.right === null || w.right.isBlack()) {
                        this.addAnimationStep('fix-delete-case3', w, 'Caso 3: Irmão preto, sobrinho esquerdo vermelho');
                        if (w.left !== null) w.left.color = RBNode.BLACK;
                        w.color = RBNode.RED;
                        this.rotateRight(w);
                        w = xParent.right;
                    }
                    
                    this.addAnimationStep('fix-delete-case4', w, 'Caso 4: Irmão preto, sobrinho direito vermelho');
                    if (w !== null) {
                        w.color = xParent.color;
                        if (w.right !== null) w.right.color = RBNode.BLACK;
                    }
                    xParent.color = RBNode.BLACK;
                    this.rotateLeft(xParent);
                    x = this.root;
                    break;
                }
            } else {
                // Casos espelhados
                let w = xParent.left;
                
                if (w !== null && w.isRed()) {
                    w.color = RBNode.BLACK;
                    xParent.color = RBNode.RED;
                    this.rotateRight(xParent);
                    w = xParent.left;
                }
                
                if (w === null || ((w.right === null || w.right.isBlack()) && 
                    (w.left === null || w.left.isBlack()))) {
                    if (w !== null) w.color = RBNode.RED;
                    x = xParent;
                    xParent = x.parent;
                } else {
                    if (w.left === null || w.left.isBlack()) {
                        if (w.right !== null) w.right.color = RBNode.BLACK;
                        w.color = RBNode.RED;
                        this.rotateLeft(w);
                        w = xParent.left;
                    }
                    
                    if (w !== null) {
                        w.color = xParent.color;
                        if (w.left !== null) w.left.color = RBNode.BLACK;
                    }
                    xParent.color = RBNode.BLACK;
                    this.rotateRight(xParent);
                    x = this.root;
                    break;
                }
            }
        }
        
        if (x !== null) {
            x.color = RBNode.BLACK;
        }
    }

    /**
     * Percurso em ordem (in-order)
     */
    inOrder(node = this.root, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push({ value: node.value, color: node.color });
            this.inOrder(node.right, result);
        }
        return result;
    }

    /**
     * Percurso em pré-ordem (pre-order)
     */
    preOrder(node = this.root, result = []) {
        if (node !== null) {
            result.push({ value: node.value, color: node.color });
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
        return result;
    }

    /**
     * Percurso em pós-ordem (post-order)
     */
    postOrder(node = this.root, result = []) {
        if (node !== null) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push({ value: node.value, color: node.color });
        }
        return result;
    }

    /**
     * Retorna a altura da árvore
     */
    height(node = this.root) {
        if (node === null) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    /**
     * Verifica se a árvore está vazia
     */
    isEmpty() {
        return this.root === null;
    }

    /**
     * Limpa a árvore
     */
    clear() {
        this.root = null;
        this.clearAnimationSteps();
    }

    /**
     * Conta o número de nós
     */
    count(node = this.root) {
        if (node === null) return 0;
        return 1 + this.count(node.left) + this.count(node.right);
    }

    /**
     * Verifica as propriedades da árvore rubro-negra
     */
    verify() {
        const errors = [];
        
        // Propriedade 2: Raiz deve ser preta
        if (this.root !== null && this.root.isRed()) {
            errors.push('Violação: A raiz é vermelha (deveria ser preta)');
        }

        // Verifica propriedades 4 e 5
        const checkNode = (node, blackCount, pathBlackCount) => {
            if (node === null) {
                if (pathBlackCount === -1) {
                    return blackCount;
                }
                if (blackCount !== pathBlackCount) {
                    errors.push('Violação: Caminhos com diferentes contagens de nós pretos');
                }
                return pathBlackCount;
            }

            // Propriedade 4: Nó vermelho não pode ter filho vermelho
            if (node.isRed()) {
                if ((node.left !== null && node.left.isRed()) || 
                    (node.right !== null && node.right.isRed())) {
                    errors.push(`Violação: Nó vermelho ${node.value} tem filho vermelho`);
                }
            } else {
                blackCount++;
            }

            pathBlackCount = checkNode(node.left, blackCount, pathBlackCount);
            pathBlackCount = checkNode(node.right, blackCount, pathBlackCount);
            
            return pathBlackCount;
        };

        checkNode(this.root, 0, -1);

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RedBlackTree;
}

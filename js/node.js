/**
 * Classe que representa um nó da Árvore Rubro-Negra
 */
class RBNode {
    static RED = 'RED';
    static BLACK = 'BLACK';

    constructor(value) {
        this.value = value;
        this.color = RBNode.RED; // Novos nós sempre são vermelhos
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    /**
     * Retorna o avô do nó
     */
    grandparent() {
        if (this.parent === null) return null;
        return this.parent.parent;
    }

    /**
     * Retorna o tio do nó
     */
    uncle() {
        const gp = this.grandparent();
        if (gp === null) return null;
        if (this.parent === gp.left) {
            return gp.right;
        }
        return gp.left;
    }

    /**
     * Retorna o irmão do nó
     */
    sibling() {
        if (this.parent === null) return null;
        if (this === this.parent.left) {
            return this.parent.right;
        }
        return this.parent.left;
    }

    /**
     * Verifica se o nó é vermelho
     */
    isRed() {
        return this.color === RBNode.RED;
    }

    /**
     * Verifica se o nó é preto
     */
    isBlack() {
        return this.color === RBNode.BLACK;
    }
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RBNode;
}


class RBNode {
    static RED = 'RED';
    static BLACK = 'BLACK';

    constructor(value) {
        this.value = value;
        this.color = RBNode.RED; // Novo nó é sempre vermelho
        this.left = null;
        this.right = null;
        this.parent = null;
    }


    grandparent() {
        if (this.parent === null) return null;
        return this.parent.parent;
    }


    uncle() {
        const gp = this.grandparent();
        if (gp === null) return null;
        if (this.parent === gp.left) {
            return gp.right;
        }
        return gp.left;
    }


    sibling() {
        if (this.parent === null) return null;
        if (this === this.parent.left) {
            return this.parent.right;
        }
        return this.parent.left;
    }


    isRed() {
        return this.color === RBNode.RED;
    }


    isBlack() {
        return this.color === RBNode.BLACK;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RBNode;
}

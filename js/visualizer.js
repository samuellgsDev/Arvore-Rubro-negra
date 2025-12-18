
class TreeVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodeRadius = 25;
        this.verticalSpacing = 70;
        this.animationSpeed = 500;
        this.highlightedNode = null;
        
        
        this.colors = {
            red: '#e74c3c',
            black: '#2c3e50',
            redText: '#ffffff',
            blackText: '#ffffff',
            line: '#7f8c8d',
            highlight: '#f1c40f',
            background: '#ecf0f1'
        };


        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }


    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }


    clear() {
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawTree(tree, highlightValue = null) {
        this.clear();
        this.highlightedNode = highlightValue;
        
        if (tree.root === null) {
            this.drawEmptyMessage();
            return;
        }

        const height = tree.height();
        const positions = this.calculatePositions(tree.root, height);
        

        this.drawLines(tree.root, positions);

        this.drawNodes(tree.root, positions);
    }


    drawEmptyMessage() {
        this.ctx.fillStyle = '#7f8c8d';
        this.ctx.font = '18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Árvore vazia - Insira um valor para começar', 
            this.canvas.width / 2, this.canvas.height / 2);
    }


    calculatePositions(root, treeHeight) {
        const positions = new Map();
        const startX = this.canvas.width / 2;
        const startY = 50;
        
        const calculateNodePositions = (node, x, y, level, offset) => {
            if (node === null) return;
            
            positions.set(node.value, { x, y });
            
            const nextOffset = offset / 2;
            
            if (node.left !== null) {
                calculateNodePositions(node.left, x - offset, y + this.verticalSpacing, level + 1, nextOffset);
            }
            
            if (node.right !== null) {
                calculateNodePositions(node.right, x + offset, y + this.verticalSpacing, level + 1, nextOffset);
            }
        };

        const initialOffset = Math.min(this.canvas.width / 4, Math.pow(2, treeHeight) * 30);
        calculateNodePositions(root, startX, startY, 0, initialOffset);
        
        return positions;
    }


    drawLines(node, positions) {
        if (node === null) return;
        
        const pos = positions.get(node.value);
        
        if (node.left !== null) {
            const leftPos = positions.get(node.left.value);
            this.drawLine(pos.x, pos.y, leftPos.x, leftPos.y);
            this.drawLines(node.left, positions);
        }
        
        if (node.right !== null) {
            const rightPos = positions.get(node.right.value);
            this.drawLine(pos.x, pos.y, rightPos.x, rightPos.y);
            this.drawLines(node.right, positions);
        }
    }


    drawLine(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }


    drawNodes(node, positions) {
        if (node === null) return;
        
        const pos = positions.get(node.value);
        const isHighlighted = this.highlightedNode === node.value;
        
        this.drawNode(pos.x, pos.y, node.value, node.color, isHighlighted);
        
        this.drawNodes(node.left, positions);
        this.drawNodes(node.right, positions);
    }



    drawNode(x, y, value, color, isHighlighted = false) {

        if (isHighlighted) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.nodeRadius + 5, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.colors.highlight;
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color === RBNode.RED ? this.colors.red : this.colors.black;
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.fillStyle = color === RBNode.RED ? this.colors.redText : this.colors.blackText;
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value.toString(), x, y);
    }

 
    drawFromState(state, highlightValue = null) {
        this.clear();
        this.highlightedNode = highlightValue;
        
        if (state === null) {
            this.drawEmptyMessage();
            return;
        }

        const height = this.getStateHeight(state);
        const positions = this.calculateStatePositions(state, height);
        
        this.drawStateLines(state, positions);
        this.drawStateNodes(state, positions);
    }

    
    getStateHeight(state) {
        if (state === null) return -1;
        return 1 + Math.max(this.getStateHeight(state.left), this.getStateHeight(state.right));
    }

  
    calculateStatePositions(state, treeHeight) {
        const positions = new Map();
        const startX = this.canvas.width / 2;
        const startY = 50;
        
        const calculate = (node, x, y, offset) => {
            if (node === null) return;
            
            positions.set(node.value, { x, y });
            
            const nextOffset = offset / 2;
            
            if (node.left !== null) {
                calculate(node.left, x - offset, y + this.verticalSpacing, nextOffset);
            }
            
            if (node.right !== null) {
                calculate(node.right, x + offset, y + this.verticalSpacing, nextOffset);
            }
        };

        const initialOffset = Math.min(this.canvas.width / 4, Math.pow(2, treeHeight) * 30);
        calculate(state, startX, startY, initialOffset);
        
        return positions;
    }

   
    drawStateLines(state, positions) {
        if (state === null) return;
        
        const pos = positions.get(state.value);
        
        if (state.left !== null) {
            const leftPos = positions.get(state.left.value);
            this.drawLine(pos.x, pos.y, leftPos.x, leftPos.y);
            this.drawStateLines(state.left, positions);
        }
        
        if (state.right !== null) {
            const rightPos = positions.get(state.right.value);
            this.drawLine(pos.x, pos.y, rightPos.x, rightPos.y);
            this.drawStateLines(state.right, positions);
        }
    }

  
    drawStateNodes(state, positions) {
        if (state === null) return;
        
        const pos = positions.get(state.value);
        const isHighlighted = this.highlightedNode === state.value;
        
        this.drawNode(pos.x, pos.y, state.value, state.color, isHighlighted);
        
        this.drawStateNodes(state.left, positions);
        this.drawStateNodes(state.right, positions);
    }

    
    async animateSteps(steps, logCallback) {
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            
            if (logCallback) {
                logCallback(step.message, step.type);
            }
            
            this.drawFromState(step.treeState, step.nodeValue);
            
            await this.delay(this.animationSpeed);
        }
    }

    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

   
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = TreeVisualizer;
}

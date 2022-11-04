import BST from './binarySearchTree.js'

// function for testing passing of function as parameter to BST methods
function squareNode(node) {
  return node.value * node.value
}

const Tree = new BST([1, 7, 4, 23, 8, 9, 6, 4, 3, 5, 7, 9, 67, 2, 6345, 324])
console.log(Tree.isBalanced())

// console.log(Tree.levelOrder()) // [7, 3, 23, 1, 5, 8, 324, 2, 4, 6, 9, 67, 6345]
const outcomeObject = Tree.levelOrder(squareNode)
console.log(outcomeObject[4]) // {value: 5, outcome: 25}

console.log(Tree.inOrder()) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 67, 324, 6345]

console.log(Tree.preOrder()) // [7, 3, 1, 2, 5, 4, 6, 23, 8, 9, 324, 67, 6345]

console.log(Tree.postOrder()) // [2, 1, 4, 6, 5, 3, 9, 8, 67, 6345, 324, 23, 7]

console.log(Tree.height(23)) // 3
console.log(Tree.height(877)) // -1

console.log(Tree.depth(3)) // 2
console.log(Tree.depth(4)) // 4
console.log(Tree.depth(99)) // -1
Tree.insert(100)
Tree.insert(87)
Tree.insert(242)
console.log(Tree.isBalanced()) // false
Tree.rebalance()
console.log(Tree.isBalanced()) // true

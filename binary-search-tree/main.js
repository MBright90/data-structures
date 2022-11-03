import BST from './binarySearchTree.js'

// function for testing passing of function as parameter to BST methods
function printNode(node) {
  console.log(`This node is ${node}`)
}

const Tree = new BST([1, 7, 4, 23, 8, 9, 6, 4, 3, 5, 7, 9, 67, 2, 6345, 324])
Tree.prettyPrint()

console.log(Tree.levelOrder()) // 7 3 23 1 5 8 324 2 4 6 9 67 6345 (correct level order structure)
Tree.levelOrder(printNode)

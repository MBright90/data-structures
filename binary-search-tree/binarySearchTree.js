import Node from './treeNode.js'

function mergeSort(array) {
  if (array.length === 1) return array

  const leftArray = mergeSort(array.slice(0, array.length / 2))
  const rightArray = mergeSort(array.slice(array.length / 2))

  let leftIndex = 0
  let rightIndex = 0
  const sortedArray = []

  while (leftArray.length > leftIndex && rightArray.length > rightIndex) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      sortedArray[sortedArray.length] = leftArray[leftIndex]
      leftIndex += 1
    } else if (leftArray[leftIndex] >= rightArray[rightIndex]) {
      sortedArray[sortedArray.length] = rightArray[rightIndex]
      rightIndex += 1
    }
  }
  if (leftIndex === leftArray.length) {
    sortedArray.push(...rightArray.slice(rightIndex))
  } else {
    sortedArray.push(...leftArray.slice(leftIndex))
  }
  return sortedArray
}

function removeDuplicates(array) {
  const sortedArray = []
  for (let i = 0; i < array.length; i += 1) {
    if (!sortedArray.includes(array[i])) sortedArray[sortedArray.length] = array[i]
  }
  return sortedArray
}

export default class Tree {
  constructor(array) {
    this.treeRoot = this.#buildTree(removeDuplicates(mergeSort(array)))
  }

  // Sort array
  // set middle item as root node
  // recursively repeat for left and right
  #buildTree(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex > endIndex) return null

    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const rootNode = new Node(array[midIndex])

    rootNode.leftPointer = this.#buildTree(array, startIndex, midIndex - 1)
    rootNode.rightPointer = this.#buildTree(array, midIndex + 1, endIndex)

    return rootNode
  }

  prettyPrint(node = this.treeRoot, prefix = '', isLeft = true) {
    if (node.rightPointer !== null) {
      this.prettyPrint(node.rightPointer, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)
    if (node.leftPointer !== null) {
      this.prettyPrint(node.leftPointer, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }

  // Takes a value and creates a new node with that value within the tree
  // If the value is already within the tree, function exits
  #insert(value, currentNode = this.treeRoot) {
    // base case (left/lesser)
    if (value < currentNode.value) {
      if (currentNode.leftPointer === null) {
        currentNode.leftPointer = new Node(value)
      } else {
        // recursive case (left/lesser)
        this.#insert(value, currentNode.leftPointer)
      }
    }
    // base case (right/greater)
    if (value > currentNode.value) {
      if (currentNode.rightPointer === null) {
        currentNode.rightPointer = new Node(value)
      } else {
        // recursive case (right/greater)
        this.#insert(value, currentNode.rightPointer)
      }
    }
  }

  // Takes a value and deletes a node with that value from the tree
  // Returns 1 if found, returns -1 if not found
  #delete(value, currentNode = this.treeRoot, previousNode = null) {
    // base case (value is found)
    if (value === currentNode.value) {
      // if node to be deleted is a leaf node or has a single child
      if ((currentNode.leftPointer === null) || (currentNode.rightPointer === null)) {
        // if previous node traversed via leftPointer
        if (previousNode.value > currentNode.value) {
          previousNode.leftPointer = currentNode.rightPointer
        } else {
          previousNode.rightPointer = currentNode.rightPointer
        }
        // if node to be deleted has two children, to find the successor we search the right node,
        // then to the maximum depth of left pointers
      } else {
        let successorParent = currentNode
        let successor = currentNode.rightPointer()
        while (successor.leftPointer !== null) {
          successorParent = successor
          successor = successor.leftPointer
        }
        if (successorParent !== currentNode) {
          successorParent.left = successor.right
        } else {
          successorParent.right = successor.left
        }
        currentNode.value = successor.value
      }
      return 1
    }
    // searched to depth and could not locate value
    if (currentNode.leftPointer === null && currentNode.rightPointer === null) return -1

    // recursive case
    if (value < currentNode.value) return this.#delete(value, currentNode.leftPointer, currentNode)
    return this.#delete(value, currentNode.rightPointer, currentNode)
  }

  // Takes a value and returns the node with the specified value
  // returns null if value is not found
  #find(value, currentNode = this.treeRoot) {
    // base case
    if (value === currentNode.value) return currentNode
    if (currentNode.leftPointer === null && currentNode.rightPointer === null) return null

    if (value < currentNode.value) return this.#find(value, currentNode.leftPointer)
    return this.#find(value, currentNode.rightPointer)
  }

  // Returns an array of each nodes value during the level order (breadth-first) method of traversal
  // If passed a function will return an array of objects
  // with the outcome of the function on each node
  #levelOrder(func = null, currentNode = this.treeRoot, queue = [], holdingArray = []) {
    // DLR Data, Left Node, Right Node
    if (func) {
      holdingArray[holdingArray.length] = {
        value: currentNode.value,
        outcome: func(currentNode),
      }
    } else {
      holdingArray[holdingArray.length] = currentNode.value
    }

    if (currentNode.leftPointer !== null) queue.push(currentNode.leftPointer)
    if (currentNode.rightPointer !== null) queue.push(currentNode.rightPointer)

    if (queue.length === 0) return holdingArray
    return this.#levelOrder(func, queue.shift(), queue, holdingArray)
  }

  // Returns an array of each nodes value during the in order (depth-first) method of traversal
  // Search left, then the data, then search right
  // If passed a function will return an array of objects
  // with the outcome of the function on each node
  #inOrder(func = null, currentNode = this.treeRoot, holdingArray = []) {
    // Traverse Left
    if (currentNode.leftPointer !== null) {
      holdingArray = this.#inOrder(func, currentNode.leftPointer, holdingArray)
    }
    // Check current Data
    if (func) {
      holdingArray[holdingArray.length] = {
        value: currentNode.value,
        outcome: func(currentNode.value),
      }
    } else {
      holdingArray[holdingArray.length] = currentNode.value
    }
    // Traverse right
    if (currentNode.rightPointer !== null) {
      holdingArray = this.#inOrder(func, currentNode.rightPointer, holdingArray)
    }
    return holdingArray
  }

  // Returns an array of each nodes value during the pre order (depth-first) method of traversal
  // Sort the data, then search left and finally search right
  // If passed a function will return an array of objects
  // with the outcome of the function on each node
  #preOrder(func = null, currentNode = this.treeRoot, holdingArray = []) {
    // Check current Data
    if (func) {
      holdingArray[holdingArray.length] = {
        value: currentNode.value,
        outcome: func(currentNode.value),
      }
    } else {
      holdingArray[holdingArray.length] = currentNode.value
    }
    // Traverse Left
    if (currentNode.leftPointer !== null) {
      holdingArray = this.#preOrder(func, currentNode.leftPointer, holdingArray)
    }
    // Traverse right
    if (currentNode.rightPointer !== null) {
      holdingArray = this.#preOrder(func, currentNode.rightPointer, holdingArray)
    }
    return holdingArray
  }

  // Returns an array of each nodes value during the pre order (depth-first) method of traversal
  // First search left, then search right, finally sort the data
  // If passed a function will return an array of objects
  // with the outcome of the function on each node
  #postOrder(func = null, currentNode = this.treeRoot, holdingArray = []) {
    // Traverse Left
    if (currentNode.leftPointer !== null) {
      holdingArray = this.#postOrder(func, currentNode.leftPointer, holdingArray)
    }
    // Traverse right
    if (currentNode.rightPointer !== null) {
      holdingArray = this.#postOrder(func, currentNode.rightPointer, holdingArray)
    }
    // Check current Data
    if (func) {
      holdingArray[holdingArray.length] = {
        value: currentNode.value,
        outcome: func(currentNode.value),
      }
    } else {
      holdingArray[holdingArray.length] = currentNode.value
    }
    return holdingArray
  }

  // Accepts a value as parameter and returns the longest distance from a leaf node
  #height(currentNode) {
    if (currentNode.leftPointer === null && currentNode.rightPointer === null) {
      return 1
    }

    if (currentNode.leftPointer === null) {
      return this.#height(currentNode.rightPointer)
    }
    if (currentNode.rightPointer === null) {
      return this.#height(currentNode.leftPointer)
    }
    const leftHeight = this.#height(currentNode.leftPointer)
    const rightHeight = this.#height(currentNode.rightPointer)

    if (leftHeight > rightHeight) return leftHeight + 1
    return rightHeight + 1
  }

  // Accepts a value as a parameter and returns the distance to the value from the tree's root
  #depth(value, currentNode = this.treeRoot) {
    if (currentNode.value === value) return 1
    if (currentNode.leftPointer === null && currentNode.rightPointer === null) return -1

    let currentDepth
    if (currentNode.value > value) {
      currentDepth = this.#depth(value, currentNode.leftPointer)
    } else {
      currentDepth = this.#depth(value, currentNode.rightPointer)
    }
    return currentDepth > 0 ? currentDepth + 1 : -1
  }

  // Returns true if maximum difference of leaf depths is 1
  #isBalanced(currentNode = this.treeRoot) {
    if (currentNode === null) return 0

    // Check left subtree
    const leftDepth = this.#isBalanced(currentNode.leftPointer)
    // Check right subtree
    const rightDepth = this.#isBalanced(currentNode.rightPointer)

    // If any previous checks have been unbalanced, return -1
    if (leftDepth === -1 || rightDepth === -1) return -1
    // If this check is unbalanced, return -1
    if (Math.abs(leftDepth - rightDepth) > 1) return -1
    // Return the current greatest height of the subtree +1 for current node
    return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1
  }

  // #########################################//
  // ####### CLOSURE RETURN FUNCTIONS ########//
  // #########################################//

  // Due to the recursive nature of the above functions, we return these functions as a layer
  // of security against the user passing in arguments to override the default arguments.

  insert(value) {
    this.#insert(value)
  }

  delete(value) {
    return this.#delete(value)
  }

  find(value) {
    return this.#find(value)
  }

  levelOrder(func = null) {
    return this.#levelOrder(func)
  }

  inOrder(func = null) {
    return this.#inOrder(func)
  }

  preOrder(func = null) {
    return this.#preOrder(func)
  }

  postOrder(func = null) {
    return this.#postOrder(func)
  }

  height(value) {
    const node = this.#find(value)
    if (!node) return -1
    return this.#height(node)
  }

  depth(value) {
    return this.#depth(value)
  }

  isBalanced() {
    return this.#isBalanced() > 0
  }

  rebalance() {
    this.treeRoot = this.#buildTree(removeDuplicates(this.#inOrder()))
  }
}

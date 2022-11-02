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
    console.log(rootNode)

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

  // Prints each nodes value during the level order of traversal
  #levelOrder(currentNode = this.treeRoot, queue = []) {
    console.log(currentNode.value)
    // DLR Data, Left Node, Right Node
    if (currentNode.leftPointer !== null) queue.push(currentNode.leftPointer)
    if (currentNode.rightPointer !== null) queue.push(currentNode.rightPointer)
    const nextNode = queue.unshift()
    this.levelOrder(nextNode, queue)
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
    this.#delete(value)
  }

  levelOrder() {
    this.#levelOrder()
  }
}

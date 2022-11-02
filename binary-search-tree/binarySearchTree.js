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
    this.treeRoot = this.buildTree(mergeSort(array))
  }

  // Sort array
  // set middle item as root node
  // recursively repeat for left and right
  buildTree(array, startIndex = 0, endIndex = array.length - 1) {
    if (startIndex > endIndex) return null

    const midIndex = ((startIndex + endIndex) / 2)
    const rootNode = new Node(array[midIndex])

    rootNode.leftPointer = this.buildTree(array, startIndex, midIndex - 1)
    rootNode.rightPointer = this.buildTree(array, midIndex + 1, endIndex)

    return rootNode
  }

  prettyPrint(node = this.treeRoot, prefix = '', isLeft = true) {
    if (node.rightPointer !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)
    if (node.leftPointer !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
}

const thisArray = mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(thisArray)
console.log(removeDuplicates(thisArray))

import Node from './treeNode.js'

function mergeSort(array) {
  if (array.length === 1) return array

  const midIndex = Math.floor((array.length - 1) / 2)
  const leftArray = mergeSort(array.slice(0, midIndex))
  const rightArray = mergeSort(array.slice(midIndex))

  let leftIndex = 0
  let rightIndex = 0
  const sortedArray = []

  while ((leftArray.length + rightArray.length) > sortedArray.length) {
    if (leftIndex === leftArray.length) {
      sortedArray.push(...rightArray.slice(rightIndex))
    } else if (rightIndex === rightArray.length) {
      sortedArray.push(...leftArray.slice(leftIndex))
    } else if (leftArray[leftIndex] < rightArray[rightIndex]) {
      sortedArray[sortedArray.length] = leftArray[leftIndex]
      leftIndex += 1
    } else {
      sortedArray[sortedArray.length] = rightArray[rightIndex]
      rightIndex += 1
    }
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

    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const rootNode = new Node(array[midIndex])

    rootNode.leftPointer = this.buildTree(array, startIndex, midIndex - 1)
    rootNode.rightPointer = this.buildTree(array, midIndex + 1, endIndex)

    return rootNode
  }
}

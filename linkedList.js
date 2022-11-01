import Node from './listNode.js'

export default class List {
  constructor() {
    this.listHead = null
  }

  // Add node containing new value to the start of the list (new head)
  prepend(value) {
    const nextNode = this.listHead
    this.listHead = new Node(value)
    this.listHead.pointer = nextNode
  }

  // Add node containing new value to the end of the list (new head)
  #appendRecursive(value, currentNode = this.listHead) {
    if (currentNode.pointer === null) {
      const newNode = new Node(value)
      currentNode.pointer = newNode
    } else {
      this.#appendRecursive(value, currentNode.pointer)
    }
  }

  // Return total length of the list
  #sizeRecursive(count = 0, currentNode = this.listHead) {
    if (currentNode.pointer === null) return count
    count += 1
    return this.#sizeRecursive(count, currentNode.pointer)
  }

  head() {
    return this.listHead
  }

  // Return the last node within the list
  #tailRecursive(currentNode = this.listHead) {
    if (currentNode.pointer === null) return currentNode
    return this.#tailRecursive(currentNode.pointer)
  }

  // Return the node at the given index or -1 if index not within range
  #atRecursive(index, currentIndex = 0, currentNode = this.listHead) {
    if (currentIndex === index) return currentNode
    if (currentNode === null) return -1
    currentIndex += 1
    return this.#atRecursive(index, currentIndex, currentNode.pointer)
  }

  // Remove the last element in the list
  #popRecursive(currentNode = this.listHead, previousNode = null) {
    if (currentNode.pointer === null) previousNode.pointer = null
    this.#popRecursive(currentNode.pointer, currentNode)
  }

  // Returns true if the given value is within any node in the list or false if not found
  #containsRecursive(value, currentNode = this.listHead) {
    if (value === currentNode.value) return true
    if (currentNode.pointer === null) return false
    return this.#containsRecursive()
  }

  // Returns the index of the given value if it is within the list or null if not found
  #findRecursive(value, index = 0, currentNode = this.listHead) {
    if (value === currentNode.value) return index
    if (currentNode.pointer === null) return null
    index += 1
    return this.#findRecursive(value, index, currentNode.pointer)
  }

  // Returns a string representation of all values within the list
  #toStringRecursive(string, currentNode = this.listHead) {
    if (currentNode === null) {
      string += 'null'
      return string
    }
    string += `( ${currentNode.value} ) -> `
    return this.#toStringRecursive(string, currentNode.pointer)
  }

  // Inserts a new node at a given index
  /* eslint-disable-next-line max-len */
  #insertAtRecursive(value, index, currentIndex = 0, currentNode = this.listHead, previousNode = null) {
    if (index === currentIndex) {
      const newNode = new Node(value)
      newNode.pointer = currentNode
      previousNode.pointer = newNode
      return
    }
    if (currentNode.pointer === null) return
    currentIndex += 1
    this.#insertAtRecursive(value, index, currentIndex, currentNode.pointer, currentNode)
  }

  // Removes a node from a given index
  #removeAtRecursive(index, currentIndex, currentNode = this.listHead, previousNode = null) {
    if (index === currentIndex) {
      if (previousNode === null) {
        currentNode.pointer = this.listHead
      } else {
        previousNode.pointer = currentNode.pointer
      }
      return
    }
    if (currentNode.pointer === null) return
    currentIndex += 1
    this.#removeAtRecursive(index, currentIndex, currentNode.pointer, currentNode)
  }

  // #########################################//
  // ####### CLOSURE RETURN FUNCTIONS ########//
  // #########################################//

  // Due to the recursive nature of my functions, I chose to return these functions as a
  // layer of security against the user passing in arguments to override the default arguments.

  append(value) {
    if (this.listHead === null) {
      this.prepend(value)
    } else {
      this.#appendRecursive(value)
    }
  }

  size() {
    return this.#sizeRecursive()
  }

  tail() {
    return this.#tailRecursive()
  }

  at(index) {
    return this.#atRecursive(index)
  }

  pop() {
    this.#popRecursive()
  }

  contains(value) {
    this.#containsRecursive(value)
  }

  find(value) {
    return this.#findRecursive(value)
  }

  tostring() {
    return this.#toStringRecursive()
  }

  insertAt(value, index) {
    this.#insertAtRecursive(value, index)
  }

  removeAt(index) {
    this.#removeAtRecursive(index)
  }
}

import Node from "./listNode"

export default class List {
    constructor() {
        this.listHead = null
    }

    // Add node containing new value to the start of the list (new head)
    prepend(value) {
        const nextNode = this.listHead;
        this.listHead = Node(value)
        this.listHead.pointer = nextNode;
    }

    // Add node containing new value to the end of the list (new head)
    _appendRecursive(value, currentNode = this.listHead) {
        if (currentNode.pointer === null) {
            const newNode = Node.value;
            currentNode.pointer = newNode;
        }
        this._appendRecursive(value, currentNode.pointer)
    }

    // Return total length of the list
    _sizeRecursive(count = 0, currentNode = this.listHead) {
        if (currentNode.pointer = null) return count;
        count++
        return this._sizeRecursive(count, currentNode.pointer)
    }

    // Return the last node within the list
    _tailRecursive(currentNode = this.listHead) {
        if (currentNode.pointer === null) return currentNode;
        return this._tailRecursive(currentNode.pointer)
    }

    // Return the node at the given index or -1 if index not within range
    _atRecursive(index, currentIndex = 0, currentNode = this.listHead) {
        if (currentIndex === index) return currentNode;
        if (currentNode = null) return -1;
        currentIndex += 1;
        return this._atRecursive(index, currentIndex, currentNode.pointer);
    }

    // Remove the last element in the list
    _popRecursive(currentNode = this.listHead, previousNode = null) {
        if (currentNode.pointer = null) previousNode.pointer = null;
        this._popRecursive(currentNode.pointer, currentNode);
    }

    // Returns true if the given value is within any node in the list or false if not found
    _containsRecursive(value, currentNode = this.listHead) {
        if (value === currentNode.value) return true;
        if (currentNode.pointer === null) return false;
        return this._containsRecursive();
    }

    // Returns the index of the given value if it is within the list or null if not found
    _findRecursive(value, index = 0) {
        if (value === currentNode.value) return index;
        if (currentNode.pointer === null) return null; 

    }

    // Returns a string representation of all values within the list
    _toStringRecursive(string, currentNode = this.listHead) {
        if (currentNode = null) return string += 'null'
        string += `( ${currentNode.value} ) -> `
        return this._toStringRecursive(string, currentNode.pointer)
    }

    //#########################################//
    //###### EXTRA ASSIGNMENT FUNCTIONS #######//
    //#########################################//

    // Inserts a new node at a given index
    _insertAtRecursive(value, index, currentIndex, currentNode = this.listHead) {

    }

    // Removes a node from a given index
    _removeAtRecursive(index, currentIndex, currentNode = this.listHead) {

    }

    //#########################################//
    //####### CLOSURE RETURN FUNCTIONS ########//
    //#########################################//

    // Due to the recursive nature of my functions, I chose to return these functions as a 
    // layer of security against the user passing in arguments to override the default arguments.

    append(value) {
        this._appendRecursive(value)
    }

    size() {
        return this._sizeRecursive()
    }

    tail() {
        return this._tailRecursive()
    }

    at(index) {
        return this._atRecursive(index)
    }

    pop() {
        this._popRecursive()
    }

    contains(value) {
        this._containsRecursive(value)
    }

    find(value) {
        return this._findRecursive(value)
    }

    tostring() {
        return this._toStringRecursive()
    }
}
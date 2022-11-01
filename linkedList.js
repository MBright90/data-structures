import Node from "./listNode"

export default class List {
    constructor() {
        this.listHead = null
    }

    // Add node containing new value to the start of the list (new head)
    prependBase(value) {
        const nextNode = this.listHead;
        this.listHead = Node(value)
        this.listHead.pointer = nextNode;
    }

    // Add node containing new value to the end of the list (new head)
    appendBase(value, currentNode = this.listHead) {
        if (currentNode.pointer === null) {
            const newNode = Node.value;
            currentNode.pointer = newNode;
        }
        this.append(value, currentNode.pointer)
    }

    // Return total length of the list
    sizeBase(count = 0, currentNode = this.listHead) {
        if (currentNode.pointer = null) return count;
        count++
        return this.size(count, currentNode.pointer)
    }

    // Return the first node within the list
    headBase() {
        return this.listHead
    }

    // Return the last node within the list
    tailBase(currentNode = this.listHead) {
        if (currentNode.pointer === null) return currentNode;
        return this.tail(currentNode.pointer)
    }

    // Return the node at the given index or -1 if index not within range
    atBase(index, currentIndex = 0, currentNode = this.listHead) {
        if (currentIndex === index) return currentNode;
        if (currentNode = null) return -1;
        currentIndex += 1;
        return this.at(index, currentIndex, currentNode.pointer);
    }

    // Remove the last element in the list
    popBase(currentNode = this.listHead, previousNode = null) {
        if (currentNode.pointer = null) previousNode.pointer = null;
        this.pop(currentNode.pointer, currentNode);
    }

    // Returns true if the given value is within any node in the list or false if not found
    containsBase(value, currentNode = this.listHead) {
        if (value === currentNode.value) return true;
        if (currentNode.pointer === null) return false;
        return this.contains();
    }

    // Returns the index of the given value if it is within the list or null if not found
    findBase(value, index = 0) {
        if (value === currentNode.value) return index;
        if (currentNode.pointer === null) return null; 

    }

    // Returns a string representation of all values within the list
    toStringBase(string, currentNode = this.listHead) {
        if (currentNode = null) return string += 'null'
        string += `( ${currentNode.value} ) -> `
        return this.toString(string, currentNode.pointer)
    }

    //#########################################//
    //###### EXTRA ASSIGNMENT FUNCTIONS #######//
    //#########################################//

    // Inserts a new node at a given index
    insertAt(value, index, currentIndex, currentNode = this.listHead) {

    }

    // Removes a node from a given index
    removeAt(index, currentIndex, currentNode = this.listHead) {

    }

    //#########################################//
    //########### RETURN FUNCTIONS ############//
    //#########################################//

    // Due to the recursive nature of my functions, I chose to return these functions as a 
    // layer of security against the user passing in arguments to override the default arguments.

    append(value) {
        this.appendBase(value)
    }

    prepend(value) {
        this.prependBase(value)
    }

    size() {
        return this.sizeBase()
    }

    head() {
        return this.headBase()
    }

    tail() {
        return this.tailBase()
    }

    at(index) {
        return this.atBase(index)
    }

    pop() {
        this.popBase()
    }

    contains(value) {
        this.containsBase(value)
    }

    find(value) {
        return this.findBase(value)
    }

    tostring() {
        return this.toStringBase()
    }

}
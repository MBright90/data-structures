import Node from "./listNode"

class List {
    constructor() {
        this.head = null
    }

    // Add node containing new value to the end of the list (new head)
    append(value) {
        let head
        const newNode = Node(value)
        if (this.head === null) this.head = newNode
    }

    // Add node containing new value to the start of the list (new head)
    prepend(value) {

    }

    // Return total size of the list
    size() {

    }

    // Return the first node within the list
    head() {

    }

    // Return the last node within the list
    tail() {

    }

    // Return the node at the given index
    at(index){

    }

    // Remove the last element in the list
    pop() {

    }

    // Returns true if the given value is within any node in the list or false if not found
    contains(value) {

    }

    // Returns the index of the given value if it is within the list or null if not found
    find(value) {

    }

    // Returns a string representation of all values within the list
    toString() {

    }

    //#########################################//
    //###### EXTRA ASSIGNMENT FUNCTIONS #######//
    //#########################################//

    // Inserts a new node at a given index
    insertAt(value, index) {

    }

    // Removes a node from a given index
    removeAt(index) {

    }
}
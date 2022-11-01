import LinkedList from './linkedList.js'

const List = new LinkedList()

console.log(List.size()) // 0

List.appendMany(50, 54, 94, 15, 13)
List.prepend(13)
List.insertAt(42, 1)
List.append(194)
List.prepend(17)

// Passed tests

console.log(List.tostring())
// ( 17 ) -> ( 13 ) -> ( 42 ) -> ( 50 ) -> ( 54 ) ->
// ( 94 ) -> ( 50 ) -> ( 54 ) -> ( 94 ) -> null

console.log(List.head().value) // 13
console.log(List.find(42)) // 1
console.log(List.tail().value) // 194

List.removeAt(7)
console.log(List.tostring()) // Shows node at index 7 is removed

List.pop()
console.log(List.tail().value) // 15

console.log(List.contains(1201)) // false
console.log(List.contains(54)) // true

List.insertAt(95, 3)
console.log(List.at(3)) // Node {value: 95, pointer: Node}

console.log(List.tostring())
// ( 17 ) -> ( 13 ) -> ( 42 ) -> ( 95 ) -> ( 50 ) -> ( 54 ) -> ( 94 ) -> ( 15 ) -> null
console.log(List.size()) // 8

let array1D = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let array2D = [1, 2, 3, [4, 5, 6, 7], 8, 9, 0]
let array3D = [1, 2, 3, [4, [5, 6], 7], 8, 9, 0]

let result = {}

// at() Returns an indexed element of an array
result['at'] = `item at index 5: ${array1D.at(5)}`

// Joins arrays and returns an array with the joined arrays
result['concat'] = `concatinated array1D & array2D: ${array1D.concat(array2D)}`

result['subArray'] = array1D.copyWithin(2, 5)

console.log(array1D.entries())

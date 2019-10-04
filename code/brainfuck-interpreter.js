/* eslint-disable no-unused-vars, no-constant-condition */

function bf(input, cInput = "") {
  input = input.replace(/[^<>+-.,W[\]]/g, "") // remove extra characters
  const memory = [0],
    loops = []
  let pointer = 0,
    output = ""
  // step through input one character at a time
  for (let loc = 0; loc < input.length; loc++)
    switch (input[loc]) {
      case ">": // increment pointer
        pointer++
        if (pointer === memory.length) memory.push(0) // extend further
        break
      case "<": // decrement pointer
        if (pointer === 0) throw new Error(`Error at char ${loc}: Cannot make pointer negative`)
        pointer--
        break
      case "+": // increment memory value at pointer
        memory[pointer]++
        break
      case "-": // decrement memory value at pointer
        memory[pointer]--
        break
      case ".": // print value at pointer as charCode
        output += String.fromCharCode(memory[pointer])
        break
      case "[": // loop
        if (memory[pointer]) loops.push(loc) // keep going if value at pointer is nonzero
        else { // otherwise skip to matching ]
          let nest = 0
          while (true) {
            loc++
            if (!input[loc]) throw new Error(`Error at char ${loc}: Expected matching ]`)
            else if (input[loc] === "[") nest++
            else if (input[loc] === "]")
              if (nest) nest-- // keep looking
              else break // found it!
          }
        }
        break
      case "]": // return to matching [
        loc = loops.pop() - 1
        break
      case ",": // insert comma input
        if (cInput !== "") {
          memory[pointer] = String.charCodeAt(cInput[0])
          cInput = cInput.substring(1)
        }
    }

  return output
}

export function safeCalculate(expression) {
  const input = expression.trim()

  if (!input) {
    throw new Error('Expression required')
  }

  if (!/^[\d+\-*/().\s]+$/.test(input)) {
    throw new Error('Only numbers and + - * / ( ) are allowed')
  }

  const tokens = tokenize(input)
  let index = 0

  function peek() {
    return tokens[index]
  }

  function consume(type, value) {
    const token = tokens[index]

    if (!token || token.type !== type || (value != null && token.value !== value)) {
      throw new Error('Invalid expression')
    }

    index += 1
    return token
  }

  function parseExpression() {
    let value = parseTerm()

    while (peek()?.type === 'operator' && (peek().value === '+' || peek().value === '-')) {
      const operator = consume('operator').value
      const right = parseTerm()
      value = operator === '+' ? value + right : value - right
    }

    return value
  }

  function parseTerm() {
    let value = parseFactor()

    while (peek()?.type === 'operator' && (peek().value === '*' || peek().value === '/')) {
      const operator = consume('operator').value
      const right = parseFactor()
      value = operator === '*' ? value * right : value / right
    }

    return value
  }

  function parseFactor() {
    if (peek()?.type === 'operator' && peek().value === '-') {
      consume('operator')
      return -parseFactor()
    }

    if (peek()?.type === 'operator' && peek().value === '+') {
      consume('operator')
      return parseFactor()
    }

    if (peek()?.type === 'paren' && peek().value === '(') {
      consume('paren')
      const value = parseExpression()
      consume('paren', ')')
      return value
    }

    return consume('number').value
  }

  const result = parseExpression()

  if (index !== tokens.length) {
    throw new Error('Invalid expression')
  }

  if (!Number.isFinite(result)) {
    throw new Error('Result is not a finite number')
  }

  return result
}

function tokenize(input) {
  const tokens = []
  let cursor = 0

  while (cursor < input.length) {
    const char = input[cursor]

    if (/\s/.test(char)) {
      cursor += 1
      continue
    }

    if (/[\d.]/.test(char)) {
      let number = char
      cursor += 1

      while (cursor < input.length && /[\d.]/.test(input[cursor])) {
        number += input[cursor]
        cursor += 1
      }

      const value = Number(number)

      if (Number.isNaN(value)) {
        throw new Error('Invalid number')
      }

      tokens.push({ type: 'number', value })
      continue
    }

    if ('+-*/'.includes(char)) {
      tokens.push({ type: 'operator', value: char })
      cursor += 1
      continue
    }

    if ('()'.includes(char)) {
      tokens.push({ type: 'paren', value: char })
      cursor += 1
      continue
    }

    throw new Error('Invalid character in expression')
  }

  return tokens
}

export function looksLikeExpression(input) {
  return /^[\d+\-*/().\s]+$/.test(input.trim()) && /\d/.test(input)
}

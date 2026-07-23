const KEY = 42

// XOR-encoded; decoded only when the user clicks "Email me"
const ENCODED = [
  75, 68, 78, 88, 79, 93, 88, 94, 69, 88, 88, 106, 77, 71, 75, 67, 70, 4, 73, 69, 71,
]

export function getContactEmail() {
  return ENCODED.map((value) => String.fromCharCode(value ^ KEY)).join('')
}

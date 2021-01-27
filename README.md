# Calculator
## Design Considerations
1. After an operation is applied, the left hand operand
becomes the result. So entering `5 * 2 +/= 7 +/=` results in 17
and `5 * 2 +/= 7 * 2 +/=` results in 34.
1. Repeating decimals (i.e. the result of entering `1 / 3 +/=`)
are truncated to 9 places.
1. Numbers with too many digits will be cut off on the left.
The exact number of digits will vary based on screen size
and the digits in question.

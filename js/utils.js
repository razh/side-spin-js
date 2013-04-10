var PI2 = 2 * Math.PI;

function clamp( value, min, max ) {
  // Swap if the order is wrong.
  if ( max < min ) {
    var temp = min;
    min = max;
    max = temp;
  }

  if ( value < min ) {
    value = min;
  } else if ( value > max ) {
    value = max;
  }

  return value;
}

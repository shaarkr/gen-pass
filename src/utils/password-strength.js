export const Metric = {
  Weak: 'weak',
  Medium: 'medium',
  Strong: 'strong',
  Perfect: 'perfect',
}

/**
 * Calculates the strength of the password & provides a matching metric
 *
 * @param {string} value
 * @returns {Object} strength & metric of the password
 *
 * **metric** - 'weak' | 'medium' | 'strong' | 'perfect'
 *
 * **strength** - [0,4]
 */
export default function checkPasswordStrength(value) {
  let strength = 0
  let metric = ''

  if (value.match(/[A-Z]+/)) {
    strength += 1
  }
  if (value.match(/[a-z]+/)) {
    strength += 1
  }
  if (value.match(/[0-9]+/)) {
    strength += 1
  }
  if (value.match(/[!@#$%^&*()_+-={}[\];<>:]+/)) {
    strength += 1
  }

  if (strength <= 1) metric = Metric.Weak
  else if (strength === 2) metric = Metric.Medium
  else if (strength === 3) metric = Metric.Strong
  else if (strength === 4) metric = Metric.Perfect

  return { strength, metric }
}

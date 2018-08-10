module.exports.asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports.singleOrDefault = (source, filterFn, defaultValue = undefined) => {
  const subset = source.filter(filterFn)
  if (subset.length === 0) {
    return defaultValue
  }
  if (subset.length > 1) {
    throw new Error('Sequence contains more than one item')
  }

  return subset[0]
}

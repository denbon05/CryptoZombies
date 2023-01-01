async function shouldThrow(promise) {
  try {
    await promise;
    expect(true);
  } catch (err) {
    return;
  }
  assert(false, 'The contract did not throw.');
}

module.exports = {
  shouldThrow,
};

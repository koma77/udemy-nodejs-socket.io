

var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: ~~(new Date().getTime()/1000)
  }
};

module.exports = { generateMessage };

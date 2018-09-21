

var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: ~~(new Date().getTime()/1000)
  }
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: `https://google.com/maps?q=${latitude},${longitude}`,
    createdAt: ~~(new Date().getTime()/1000)
  }
}

module.exports = { generateMessage, generateLocationMessage };

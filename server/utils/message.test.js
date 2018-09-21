var expect  = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct object message', () => {
    var from = 'testuser';
    var text = 'a test text';

    var res = generateMessage(from, text);

    expect(res.text).toBe(text);
    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = 'testuser';
    var latitude = '1';
    var longitude = '2';

    var res = generateLocationMessage(from, latitude, longitude);

    expect(res.url).toBe(`https://google.com/maps?q=1,2`);
    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
  });
});

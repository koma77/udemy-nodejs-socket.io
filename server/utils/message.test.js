var expect  = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct objet message', () => {
    var from = 'testuser';
    var text = 'a test text';

    var res = generateMessage(from, text);

    expect(res.text).toBe(text);
    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe('number');
  });

});

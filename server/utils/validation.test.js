const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should allow string if paramer is not zero length string', () => {
    var str =  isRealString('  ZZZZZZ  ');
    expect(str).toBe.true;
  });

  it('should reject non string values', () => {
    var res = isRealString(98);
    expect(res).toBe.false;
  });

  it('should reject string with non spaces', () => {
    var res = isRealString('     ');
    expect(res).toBe.false;
  });
});

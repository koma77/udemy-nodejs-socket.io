const expect  = require('expect');
const {Users} = require('./users');

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: 1,
    name: 'Mike',
    room: 'Office'
  }, {
    id: 2,
    name: 'Joe',
    room: 'Pantry'
  }, {
    id: 3,
    name: 'Andrey',
    room: 'Office'
  }];
});

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrey',
      room: 'Office'
    }

    var resp = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove user', () => {
    var removedUser = users.removeUser(2);
    expect(users.users.indexOf(removedUser)).toBe(-1);
  });

  it('should not remove user', () => {
    var oldUsers = users.users;
    var removedUser = users.removeUser(7);
    expect(users.users).toEqual(oldUsers);
  });

  it('should find user', () => {
    var user = users.getUser(2);
    expect(user.id).toBe(2);
    expect(user.name).toBe('Joe');
  });

  it('should not find user', () => {
    var user = users.getUser(7);
    expect(user).undefined;
    //expect(user).toNotExist();
  });

  it('should return names to office', () => {
    var userList = users.getUserList('Office');
    //console.log(userList);
    expect(userList).toEqual(['Mike', 'Andrey']);
  });

  it('should return names to pantry', () => {
    var userList = users.getUserList('Pantry');
    //console.log(userList);
    expect(userList).toEqual(['Joe']);
  });
});

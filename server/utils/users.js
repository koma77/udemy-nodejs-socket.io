

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    //var user = this.users.filter((user) => user.id === id)[0];
    var user = this.getUser(id);
    if (user) {
      //var userIdx = this.users.indexOf(user);
      //this.users.splice(userIdx,1);
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    var user = this.users.filter((user) => user.id === id)[0];
    return user;
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room  === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};

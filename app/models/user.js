export default class User {
  constructor(id, firstName, lastName, username, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
  }

  getId() {
    return this.id;
  }
  getFirstName() {
    return this.firstName;
  }
  getLasttName() {
    return this.lastName;
  }
  getUsername() {
    return this.username;
  }
  getEmail() {
    return this.email;
  }

}
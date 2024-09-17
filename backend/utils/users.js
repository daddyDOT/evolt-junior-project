let onlineUsers = [];

// functions
const get = () => onlineUsers;

const isOnline = (socketId) => {
  return onlineUsers.some(user => user.socketId === socketId);
};

const add = (user) => {
  if (!onlineUsers.includes(user)) {
    onlineUsers.push(user);
  }

  return onlineUsers;
};

const remove = (socketId) => {
  onlineUsers = onlineUsers.filter(u => u.socketId !== socketId);

  return onlineUsers;
}

module.exports = {
  get,
  isOnline,
  add,
  remove
};
const DBUser = 'new-user_31';
const DBPassword = 'new-user_31';

module.exports = {
  port: 8080,
  DBURL: `mongodb+srv://${DBUser}:${DBPassword}@cluster0-fr2wp.mongodb.net/marketplace?retryWrites=true&w=majority`
};

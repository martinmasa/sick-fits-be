const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
  async createItem(parent, args, context, info) {
    // TODO check if they are logged in

    const item = await context.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },
  updateItem(parent, args, context, info) {
    // copy properties to be updated
    const updateData = { ...args };
    // delete ID as cannot be updated
    delete updateData.id;

    // run update data
    return context.db.mutation.updateItem(
      {
        data: updateData,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteItem(parent, args, context, info) {
    const where = { id: args.id };
    // 1. Find the item
    const item = await context.db.query.item({ where }, `{ id title }`);
    // 2. Check if they own the item or have permissions
    // 3. Delete it
    return context.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10); // hash user password

    // store user details in DB
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );

    // create JWT for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set JWT as cookie in response
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    return user;
  }
};

module.exports = mutations;

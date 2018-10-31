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
  }
};

module.exports = mutations;

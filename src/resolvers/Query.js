const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, context, info) {
    if (!context.request.userId) {
      return null;
    }

    return context.db.query.user({ where: { id: context.request.userId } }, info);
  }
};

module.exports = Query;

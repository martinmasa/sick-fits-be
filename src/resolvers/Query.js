const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, context, info) {
    if (!context.request.userId) {
      return null;
    }

    console.log(context.request.userId);
    return context.db.query.user({ where: { id: 'cjr6qvzonhfuo0950jojojkiw' } }, info);
  }
};

module.exports = Query;

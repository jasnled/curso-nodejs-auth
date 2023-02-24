const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: [{
            association: 'user',
            attributes:{exclude: ['password', 'recoveryToken']}
          }]
        },
        'items'
      ]
    });
    return order;
  }

  async find() {
    return [];
  }

  async findByUser (userId) {

    const orders = await models.Order.findAll({
      where:{
        '$customer.user.id$':userId  //para este tipo de consultas en las que las queremos las ordenes asociadas a un usuario
      },                             //pero la order esta directamente ligadas a un customer no a un usuario
      include: [                     //por lo que hacemos la consulta con el where:'$customer.user.id$'
        {
          association: 'customer',
          include: [{
            association: 'user',
            attributes:{exclude: ['password', 'recoveryToken']}
          }]
        },
        'items'
      ]
    });
    /*const editOrders = orders.map((order) => {

      delete order.customer.user.dataValues.password;
      return order;
    })*/;

    return editOrders;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;

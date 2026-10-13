// services/AddressService.js
const Address = require("../models/Address");

class AddressService {
  async createAddress(data) {
    return await Address.create(data);
  }

  async getUserAddresses(userId) {
    return await Address.find({ user: userId }).sort({ createdAt: -1 });
  }

  async getAddressById(id, userId) {
    return await Address.findOne({ _id: id, user: userId });
  }

  async updateAddress(id, userId, data) {
    return await Address.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteAddress(id, userId) {
    return await Address.findOneAndDelete({ _id: id, user: userId });
  }
}

module.exports = new AddressService();

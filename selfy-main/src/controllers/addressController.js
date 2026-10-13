// controllers/AddressController.js
const AddressService = require("../services/AddressService");
const User = require("../models/User");

class AddressController {
  async create(req, res) {
    try {
      const userId = req.user._id;

      const address = await AddressService.createAddress({
        ...req.body,
        user: userId,
      });

      await User.findByIdAndUpdate(userId, {
        $push: { addresses: address._id },
      });

      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const addresses = await AddressService.getUserAddresses(req.user._id);
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const address = await AddressService.getAddressById(
        req.params.id,
        req.user._id
      );
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const address = await AddressService.updateAddress(
        req.params.id,
        req.user._id,
        req.body
      );
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const userId = req.user._id;
      const id = req.params.id;

      await AddressService.deleteAddress(id, userId);

      await User.findByIdAndUpdate(userId, {
        $pull: { addresses: id },
      });

      res.status(200).json({ message: "Address deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AddressController();

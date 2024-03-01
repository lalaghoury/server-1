const UserModel = require("../schemas/UserSchema");
const newsletterModel = require("../schemas/newsletterSchema");
const sendEmail = require("../config/nodemailerConfig");

const newsletterController = {
  subscribeToNewsletter: async (req, res) => {
    try {
      const { email, userId } = req.body;
      if (!email) {
        return res.status(400).send({
          message:
            "Your Account's Email is required for newsletter subscription.",
          success: false,
        });
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: "Please sign up first. User not found",
          success: false,
        });
      }
      if (user.email !== email) {
        return res.status(400).send({
          message: "The email provided does not match your records.",
          success: false,
        });
      }
      if (user.newsletter) {
        return res.status(409).send({
          message: "You already subscribed to newsletter.",
          success: false,
        });
      }
      const existingSubscription = await newsletterModel.findOne({
        email: user.email,
      });
      if (existingSubscription) {
        return res.status(409).send({
          message: "You are already subscribed to newsletter.",
          success: false,
        });
      }

      await newsletterModel.create({ email: user.email });

      user.newsletter = true;
      await user.save();

      sendEmail(
        user.email,
        "Subscribed",
        "You've subscribed to our newsletter."
      );

      res.status(200).json({
        success: true,
        message: "Subscribed to newsletter successfully.",
        user: user,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  unsubscribeFromNewsletter: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.userId);
      if (!user) {
        return res.status(404).send({
          message: "Please login in first. User not found",
          success: false,
        });
      }
      if (!user.newsletter) {
        return res.status(409).send({
          message: "You are not subscribed to newsletter.",
          success: false,
        });
      }
      const existingSubscription = await newsletterModel.findOne({
        email: user.email,
      });
      if (!existingSubscription) {
        return res.status(409).send({
          message: "You are not subscribed to newsletter.",
          success: false,
        });
      }

      user.newsletter = false;
      await user.save();
      await newsletterModel.deleteOne({ email: user.email });

      // Placeholder for send email logic
      sendEmail(
        user.email,
        "Unsubscribed",
        "You've unsubscribed from our newsletter."
      );

      res.status(200).json({
        success: true,
        message: "Unsubscribed from newsletter successfully.",
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },

  getAllNewsletters: async (req, res) => {
    try {
      const subscribers = await newsletterModel.find();
      res.status(200).json({
        success: true,
        subscribers,
      });
    } catch (error) {
      res.status(500).send({
        error,
        message: "Internal Server Error",
        success: false,
      });
    }
  },
};

module.exports = newsletterController;

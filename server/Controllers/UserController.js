const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require(`../models/index`);
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }

      const userData = await User.findOne({
        where: { email },
      });

      if (!userData) {
        throw { name: `Email or Password is invalid` };
      }

      const validPass = comparePassword(password, userData.password);

      if (!validPass) {
        throw { name: `Email or Password is invalid` };
      }

      const access_token = signToken(userData);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    const token = req.headers["google-token"];
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      let user = await User.findOne({
        where: { email },
      });

      if (!user) {
        user = await User.create(
          {
            name: payload.name,
            email: payload.email,
            password: "dummy-password- " + Date.now(),
          },
          {
            hooks: false,
          }
        );
      }

      const access_token = signToken(user);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async profile(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { email, name, address, phoneNumber } = req.body;

      const user = await User.update(
        { email, name, address, phoneNumber },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: `Profile updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

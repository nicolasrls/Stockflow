// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy'; // Importando speakeasy para gerar a seed
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Gerar a seed 2FA usando o speakeasy
    const twoFactorSecret = speakeasy.generateSecret().base32;
    user = new User({ name, email, password, twoFactorSecret });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const otpAuthUrl = `otpauth://totp/Stockflow:${email}?secret=${twoFactorSecret}&issuer=Stockflow`;
    const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl); // Gera a URL do QR Code
    res.status(201).json({ token, twoFactorSecret, qrCodeDataUrl});
  } catch (err) {
    console.error('Error in registration:', err); // <-- Isso irá logar o erro específico no terminal
    res.status(500).json({ message: 'Server error' });
  }
};

// src/controllers/authController.ts
export const login = async (req: Request, res: Response) => {
  const { email, password, twoFactorToken} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid pass credentials' });
    }

    // Validar o token de 2FA
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFactorToken,
      window: 1,
    });

    console.log("Secret:", user.twoFactorSecret);
    console.log("Token recebido:", twoFactorToken);
    console.log("Token verificado:", verified);

    if (!verified) {
      return res.status(400).json({ message: 'Invalid 2FA token' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error in login:', err); // <-- Isso irá logar o erro específico no terminal
    res.status(500).json({ message: 'Server error' });
  }
};

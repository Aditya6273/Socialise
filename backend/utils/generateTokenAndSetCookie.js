import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    httpOnly: true, 
    secure: isProduction, 
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000 * 30 * 24, 
  });

  return token;
};

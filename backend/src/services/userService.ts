import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { User, LoginDetails } from '../interfaces/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library

const createUser = async (user: User) => {
  const userId = uuidv4(); // Generate UUID for userId
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const pool = await sql.connect(sqlConfig);
  const request = pool.request()
    .input('userId', sql.UniqueIdentifier, userId) // Use generated UUID
    .input('firstname', sql.NVarChar, user.firstname)
    .input('lastname', sql.NVarChar, user.lastname)
    .input('phoneNumber', sql.VarChar, user.phoneNumber)
    .input('address', sql.VarChar, user.address)
    .input('email', sql.NVarChar, user.email)
    .input('password', sql.NVarChar, hashedPassword)
    .input('createdAt', sql.DateTime, new Date());

  const result = await request.query(
    'INSERT INTO users (userId, firstname, lastname, phoneNumber, address, email, password, createdAt) ' +
    'VALUES (@userId, @firstname, @lastname, @phoneNumber, @address, @email, @password, @createdAt)'
  );

  return result;
};

const getUserByEmail = async (email: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM users WHERE email = @email');
  return result.recordset[0];
};

// Hardcoded admin credentials
const adminCredentials = {
  email: 'admin@example.com',
  password: 'adminpassword'
};

const loginUser = async (loginDetails: LoginDetails) => {
  console.log('Attempting to log in:', loginDetails);

  // Check if login details match hardcoded admin credentials
  if (loginDetails.email === adminCredentials.email && loginDetails.password === adminCredentials.password) {
    console.log('Admin login successful');
    const token = jwt.sign({ email: adminCredentials.email, role: 'admin' }, 'your_secret_key', { expiresIn: '1h' });
    return { token, role: 'admin' };
  }

  // Check if login details match any user in the database
  const user = await getUserByEmail(loginDetails.email);
  if (user) {
    console.log('User found:', user);
    if (await bcrypt.compare(loginDetails.password, user.password)) {
      console.log('User login successful');
      const token = jwt.sign({ userId: user.userId, role: 'user' }, 'your_secret_key', { expiresIn: '1h' });
      return { token, role: 'user' };
    } else {
      console.log('Password mismatch');
    }
  } else {
    console.log('User not found in database');
  }

  console.log('Login failed: Invalid email or password');
  throw new Error('Invalid email or password');
};

const updateUser = async (userId: string, user: Partial<User>) => {
  const pool = await sql.connect(sqlConfig);
  const fieldsToUpdate = Object.keys(user)
    .map(key => `${key} = @${key}`)
    .join(', ');
  const request = pool.request().input('userId', sql.UniqueIdentifier, userId);
  Object.entries(user).forEach(([key, value]) => {
    request.input(key, sql.NVarChar, value);
  });
  const result = await request.query(`UPDATE users SET ${fieldsToUpdate} WHERE userId = @userId`);
  return result;
};

const deleteUser = async (userId: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query('DELETE FROM users WHERE userId = @userId');
  return result;
};

const getAllUsers = async () => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request().query('SELECT * FROM users');
  return result.recordset;
};

const getUserById = async (userId: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query('SELECT * FROM users WHERE userId = @userId');
  return result.recordset[0];
};

export {
  createUser,
  getUserByEmail,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
};

const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const Joi = require('joi');
const xss = require('xss');


jest.mock('../models', () => {
    return {
        User: {
            findByPk: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
        },
    };
});
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('xss', () => jest.fn(val => val));

beforeAll(async () => {
    await sequelize.authenticate();
});
afterAll(async () => {
    await sequelize.close(); 
});

// Test de notre route GET by id

describe('GET /users/:id', () => {
    beforeEach(() => {
        jwt.verify = jest.fn().mockImplementation((token) => {
            if (token === 'validtoken') {
                return { user_id: 1 };
            } else {
                throw new Error('Token not valid');
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should return 200 if user is accessing their own profile', async () => {
        const mockUser = { id: 1, prenom: 'John', nom: 'Doe', email: 'john.doe@example.com' };
        User.findByPk.mockResolvedValue(mockUser);


        const response = await request(app)
            .get('/users/1')
            .set('Cookie', ['token=validtoken']);

        expect(response.status).toBe(200);
    });

    it('should return 404 if requested user is not found', async () => {
        User.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .get('/users/999')
            .set('Cookie', ['token=validtoken']);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found!');
    });
});


// Test de notre fonction signup

describe('POST /users/signup', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should create a new user and return 201', async () => {
        const newUser = {
          utilisateur: 'Demo',
          prenom: 'Jean',
          nom: 'Test',
          email: 'jean.test@gmail.com',
          telephone: '0123456789',
          password: 'password123',
        };
      
        bcrypt.hash.mockResolvedValue('hashedpassword');
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ id: 1, ...newUser, password: 'hashedpassword' });
      
        const response = await request(app)
          .post('/users/signup')
          .send(newUser);
      
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created!');
        expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
          ...newUser,
          password: 'hashedpassword',
          adresse_ip: expect.any(String),
        }));
      });

      it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/users/signup')
            .send({ utilisateur: 'Demo', prenom: 'Jean' }); // Missing email and password
    
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/required/);
    });
    

    it('should return 400 if email is invalid', async () => {
        const invalidUser = {
            utilisateur: 'Demo',
            prenom: 'jean',
            nom: 'test',
            email: 'invalid-email',
            telephone: '0987654321',
            password: 'validpassword123',
        };

        const response = await request(app)
            .post('/users/signup')
            .send(invalidUser);
    
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/email/);
    });

    it('should return 400 if password is too short', async () => {
        const invalidUser = {
            utilisateur: 'Demo',
            prenom: 'jean',
            nom: 'test',
            email: 'valid@email.com',
            langue: 'fr',
            telephone: '0987654321',
            password: 'short',
        };
    
        const response = await request(app)
            .post('/users/signup')
            .send(invalidUser);
    
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/password/);
    });

    it('should return 400 if email already exists', async () => {
        const existingUser = { id: 1, email: 'jean.test@gmail.com' };
        
        User.findOne.mockResolvedValue(existingUser);
    
        const response = await request(app)
            .post('/users/signup')
            .send({
                utilisateur: 'Demo',
                prenom: 'jean',
                nom: 'test',
                email: 'jean.test@gmail.com',
                langue: 'fr',
                password: 'validpassword123',
                telephone: '0987654321',
            });
    
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email already in use');
    });

    it('should return 500 if something goes wrong', async () => {
        User.findOne.mockRejectedValue(new Error('Database error'));
    
        const response = await request(app)
            .post('/users/signup')
            .send({
                utilisateur: 'Demo',
                prenom: 'jean',
                nom: 'test',
                email: 'erroruser@example.com',
                langue: 'fr',
                password: 'validpassword123',
                telephone: '0987654321',
            });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Database error');
    });
});

//Test de notre fonction login

describe('POST /users/login', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token if login is successful', async () => {
        const user = {
            id: 1,
            utilisateur: 'Demo',
            prenom: 'jean',
            nom: 'test',
            email: 'jean.test@gmail.com',
            langue: 'fr',
            telephone: '0123456789',
            password: 'hashedpassword',
        };

        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('validtoken');

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'jean.test@gmail.com', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toContain('token=validtoken');
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
        expect(jwt.sign).toHaveBeenCalledWith(
            { user_id: user.id}, 
            process.env.JWT_PRIVATE_KEY,
            { algorithm: 'RS256', expiresIn: '2h', audience: "yobson", issuer: "yobson"  }
        );
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({ email: 'invalid-email', password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/email/);
    });

    it('should return 401 if email is not found', async () => {
        User.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'nonexistent@example.com', password: 'password123' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid credentials');
    });

    it('should return 401 if password is incorrect', async () => {
        const user = {
            id: 1,
            email: 'jean.test@gmail.com',
            password: 'hashedpassword'
        };

        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'jean.test@gmail.com', password: 'wrongpassword' });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Invalid credentials');
    });

    it('should return 500 if something goes wrong', async () => {
        User.findOne.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'erroruser@example.com', password: 'password123' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('An error occurred during login');
    });
});

// Test de notre route PUT

describe('PUT /users/:id', () => {

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return 200 if user_id matches auth.user_id', async () => {
        jwt.verify = jest.fn().mockReturnValue({ user_id: 1 });
    
        const mockUpdate = jest.fn(); // Mock the instance method
        User.findByPk.mockResolvedValue({
            id: 1,
            prenom: 'Jean',
            nom: 'Test',
            email: 'jean.test@gmail.com',
            update: mockUpdate, // Provide the mocked instance method
        });
    
        const response = await request(app)
            .put('/users/1')
            .set('Cookie', ['token=validtoken'])
            .send({ prenom: 'Modified' });
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User modified!');
        expect(User.findByPk).toHaveBeenCalledWith("1"); // ID should match as string
        expect(mockUpdate).toHaveBeenCalledWith({ prenom: 'Modified' }); // Check instance method
    });
    
    


    it('should return 403 if user tries to modify another user', async () => {

        jwt.verify = jest.fn().mockImplementation((token) => {
            if (token === 'validtoken') {
                return { user_id: 2 }; 
            } else {
                throw new Error('Token not valid');
            }
        });

        const userToUpdate = { 
            id: 1,
            prenom: 'Jean',
            nom: 'Test',
            email: 'jean.test@gmail.com',
            type: 'locataire'
        };

        User.findByPk.mockResolvedValue(userToUpdate); 

        const response = await request(app)
            .put('/users/1') 
            .set('Cookie', ['token=validtoken']) 
            .send({ prenom: 'Modified' }); 

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access forbidden'); 
    });

    it('should return 500 if something goes wrong', async () => {

        jwt.verify = jest.fn().mockImplementation((token) => {
            if (token === 'validtoken') {
                return { user_id: 1, type: 'super_admin' }; 
            } else {
                throw new Error('Token not valid');
            }
        });

        User.findByPk.mockRejectedValue(new Error('Database error')); 

        const response = await request(app)
            .put('/users/1') 
            .set('Cookie', ['token=validtoken']) 
            .send({ prenom: 'Modified' }); 

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Database error'); 
    });
});

// Test de la route DELETE
describe('DELETE /users/:id', () => {
    beforeEach(() => {
        jwt.verify = jest.fn().mockReturnValue({ user_id: 1 });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete the user and return 200 if successful', async () => {
        jwt.verify = jest.fn().mockReturnValue({ user_id: 1 });
    
        const mockUser = { id: 1, email: 'deleteuser@gmail.com', password: 'hashedpassword' };
        bcrypt.compare.mockResolvedValue(true);

        User.findByPk.mockResolvedValue(mockUser);
        User.destroy.mockResolvedValue(1);
    
        const response = await request(app)
        .delete('/users/1')
        .set('Cookie', ['token=validtoken'])
        .send({ password: 'password123' });
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted succefully!');
        expect(User.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
    });
    

    it('should return 403 if user tries to delete another user', async () => {
        jwt.verify = jest.fn().mockImplementation((token, secret) => {
            if (token === 'validtoken') {
                return { user_id: 1 };
            } else {
                throw new Error('Token not valid');
            }
        });
        const response = await request(app)
            .delete('/users/2')
            .set('Cookie', ['token=validtoken']);

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access forbidden');
        expect(User.destroy).not.toHaveBeenCalled();
    });

    it('should return 404 if user is not found', async () => {
        jwt.verify = jest.fn().mockImplementation((token, secret) => {
            if (token === 'validtoken') {
                return { user_id: 1 };
            } else {
                throw new Error('Token not valid');
            }
        });
        User.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .delete('/users/1')
            .set('Cookie', ['token=validtoken']);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Requesting user not found');
    });

    it('should return 500 if something goes wrong', async () => {
        jwt.verify = jest.fn().mockImplementation((token, secret) => {
            if (token === 'validtoken') {
                return { user_id: 1 };
            } else {
                throw new Error('Token not valid');
            }
        });
        User.findByPk.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .delete('/users/1')
            .set('Cookie', ['token=validtoken']);

        expect(response.status).toBe(500);
    });
});
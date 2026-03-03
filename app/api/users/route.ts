import { NextResponse } from 'next/server';

// In-memory database (dummy data)
let users: Array<{ id: number; name: string; email: string }> = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

let nextId = 3;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
export async function GET() {
    return NextResponse.json(users, { status: 200 });
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const newUser = { id: nextId++, name, email };
        users.push(newUser);

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid JSON' },
            { status: 400 }
        );
    }
}

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     description: Update an existing user's information
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - email
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 */
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, email } = body;

        if (!id || !name || !email) {
            return NextResponse.json(
                { error: 'Id, name, and email are required' },
                { status: 400 }
            );
        }

        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        users[userIndex] = { id, name, email };
        return NextResponse.json(users[userIndex], { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid JSON' },
            { status: 400 }
        );
    }
}

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a user
 *     description: Remove a user from the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 */
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Id is required' },
                { status: 400 }
            );
        }

        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const deletedUser = users.splice(userIndex, 1);
        return NextResponse.json(
            { message: 'User deleted successfully', user: deletedUser[0] },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid JSON' },
            { status: 400 }
        );
    }
}

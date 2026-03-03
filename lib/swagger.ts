import swaggerJSDoc from 'swagger-jsdoc';

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "A simple user management API with CRUD operations",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(option);


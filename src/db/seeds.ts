require('dotenv').config();
const PrismaClient = require("@prisma/client").PrismaClient;

const main = async () => {
    const Prisma = new PrismaClient();
    console.log("Seeding...");
    const products = await Prisma.product.createMany({
        data: [
            { 
                name: "JK Copier Paper 75gsm (red)", 
                uri: [
                    "bulk-stationary/jjimoncmkeglqkiywsph",
                    "bulk-stationary/lqqeuz7ywrbxpqbycckh",
                    "bulk-stationary/nu6ydhxev2anvbarv7w0",
                    "bulk-stationary/uvdasnl1tnpzogywmkvy"
                ],
                exTag: "Limited stock",
                description: [
                    "Premium JK Copier Paper for inkjet and laser printers.",
                    "A4 size with smooth texture for sharp, clear prints.",
                    "Each box contains 10x500 sheets of 75 GSM paper.",
                    "Ideal for both professional and personal use."
                ],
                quantity: [1,10,100,1000],
                price: [385.00, 370.00, 350.00, 325.06],
                unit: "pack"
            },
            { 
                name: "Copy Gold A4 Paper", 
                uri: [
                    "bulk-stationary/vm954kuwxvmcrdbbihcy",
                    "bulk-stationary/d7xzth49i0aoddc6l771",
                    "bulk-stationary/uayas5hf4hh7x3qscgqm"
                ],
                exTag: "Most Sold",
                description: [
                    "High-quality 75g/m² paper for office and home printing.",
                    "Designed for copiers, laser printers, and inkjet printers.",
                    "Each pack contains 500 reliable sheets.",
                    "Perfect for reports, presentations, and everyday documents."
                ],
                quantity: [1,10,100,1000],
                price: [650.00, 600.00, 550.00, 456.98],
                unit: "bundle"
            },  
        ],
    });
    console.log(products);
    console.log("Seeding finished");
}

main();

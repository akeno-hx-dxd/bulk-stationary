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
                label: "Copier Paper",
                description: "Elevate your printing experience with our premium JK Copier Paper. Designed for perfection, this A4 size copy paper delivers a smooth texture and unparalleled performance for both inkjet and laser printers. Each box contains 10x500 sheets of 75 GSM paper, guaranteeing sharp and clear prints every time. Ideal for both professional and personal use, make the switch to a paper that truly stands out.",
                quantity: [1,10,100,1000],
                price: [385.00, 370.00, 350.00, 325.06] 
            },
            { 
                name: "Copy Gold A4 Paper", 
                uri: [
                    "bulk-stationary/vm954kuwxvmcrdbbihcy",
                    "bulk-stationary/d7xzth49i0aoddc6l771",
                    "bulk-stationary/uayas5hf4hh7x3qscgqm"
                ],
                label: "Copier Paper",
                description: "Introducing Copy Gold A4 Paper: the ultimate choice for all your office and home printing needs. This high-quality 75g/m² paper is designed for unmatched performance in copiers, laser printers, and inkjet printers. Each pack contains 500 smooth, reliable sheets to ensure crisp, clear prints every time. Perfect for reports, presentations, and everyday documents, Copy Gold A4 Paper offers superior quality and consistency. Don't settle for less when you can have the best—order your pack today and experience the difference.",
                quantity: [1,10,100,1000],
                price: [650.00, 600.00, 550.00, 456.98] 
            },  
        ],
    });
    console.log(products);
    console.log("Seeding finished");
}

main();
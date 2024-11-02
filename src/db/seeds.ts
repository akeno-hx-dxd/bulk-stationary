require('dotenv').config();
const { PrismaClient } = require("@prisma/client");

const main = async () => {
    const prisma = new PrismaClient();
    console.log("Clearing database...");
    await prisma.groupProduct.deleteMany();
    await prisma.catalogProduct.deleteMany();
    await prisma.product.deleteMany();
    await prisma.catalog.deleteMany();
    await prisma.group.deleteMany();

    console.log("Seeding...");

    // Create Products
    const productsData = [
        { 
            name: "JK Copier Paper 75gsm (Red)", 
            image_uris: ["cld-sample", "cld-sample-2", "cld-sample-3"],
            unit: "pack",
            descriptions: [
                "Premium copier paper suitable for inkjet and laser printers.",
                "A4 size, 75 GSM, with smooth texture for clear prints.",
                "Each box contains 10x500 sheets, ideal for professional use."
            ],
            pricing: [
                { quantity: 1, price: 385.00 },
                { quantity: 10, price: 370.00 },
                { quantity: 100, price: 350.00 },
                { quantity: 1000, price: 325.06 }
            ],
            brand: "JK Paper"
        },
        { 
            name: "Copy Gold A4 Paper", 
            image_uris: ["cld-sample-2", "cld-sample-3", "cld-sample"],
            unit: "bundle",
            descriptions: [
                "High-quality paper for office and home printing.",
                "75g/m², suitable for copiers, laser printers, and inkjet printers.",
                "500 sheets per pack, perfect for everyday documents."
            ],
            pricing: [
                { quantity: 1, price: 650.00 },
                { quantity: 10, price: 600.00 },
                { quantity: 100, price: 550.00 },
                { quantity: 1000, price: 456.98 }
            ],
            brand: "Copy Gold"
        }
    ];

    // Generate additional products
    for (let i = 3; i <= 20; i++) {
        productsData.push({
            name: `Sample Product ${i}`,
            image_uris: [`cld-sample-${i % 2+2}`],
            unit: "item",
            descriptions: [
                `Sample description for product ${i}.`,
                "Ideal for various uses.",
                "A must-have item."
            ],
            pricing: [
                { quantity: 1, price: (100 + i * 5) },
                { quantity: 10, price: (95 + i * 5) },
                { quantity: 100, price: (90 + i * 5) }
            ],
            brand: `Brand ${i}`
        });
    }

    // Create Products in the database
    const createdProducts = await prisma.product.createMany({
        data: productsData
    });
    console.log("Products created:", createdProducts);

    // Retrieve created product IDs
    const allProducts = await prisma.product.findMany();
    const productIds = allProducts.map((product : any) => product.id);

    // Define Groups with a selection of product IDs
    const groupsData = [
        {
            name: "Trending",
            products: productIds.slice(0, 5)
        },
        {
            name: "Shop by Brands",
            products: productIds.slice(5, 10)
        },
        {
            name: "Office Essentials",
            products: productIds.slice(10, 15)
        },
        {
            name: "School Essentials",
            products: productIds.slice(15, 20)
        },
        {
            name: "Craft Essentials",
            products: productIds.slice(0, 5).concat(productIds.slice(15, 20))
        }
    ];

    // Create Groups
    for (const group of groupsData) {
        const groupWithProducts = await prisma.group.create({
            data: {
                name: group.name,
                groupProducts: {
                    create: group.products.map((productId: string) => ({
                        productId
                    }))
                }
            }
        });
        console.log("Group created:", groupWithProducts);
    }

    // Define Catalogs with unique properties and images
    const catalogsData = [
        {
            name: "Office Basics",
            image_uri: "DSC00325_720x_cpbr5v",
            products: productIds.slice(0, 3)
        },
        {
            name: "Back to School Specials",
            image_uri: "Resin_720x_m9yhs6",
            products: productIds.slice(3, 6)
        },
        {
            name: "Crafting Collection",
            image_uri: "School_Supplies_720x_rcfxbj",
            products: productIds.slice(6, 9)
        },
        {
            name: "Creative Alcohol Inks",
            image_uri: "Alcohol_Inks_720x_kmyrgj",
            products: productIds.slice(9, 12)
        },
        {
            name: "Elegant Calligraphy",
            image_uri: "Calligraphy_720x_st0td2",
            products: productIds.slice(12, 15)
        },
        {
            name: "DIY Craft Essentials",
            image_uri: "Craft_720x_s0ncgx",
            products: productIds.slice(15, 18)
        },
        {
            name: "Stationery Must-Haves",
            image_uri: "Resin_720x_m9yhs6",
            products: productIds.slice(0, 3).concat(productIds.slice(18, 20))
        },
        {
            name: "Professional Supplies",
            image_uri: "DSC00325_720x_cpbr5v",
            products: productIds.slice(5, 10)
        },
        {
            name: "Premium Craft Kits",
            image_uri: "School_Supplies_720x_rcfxbj",
            products: productIds.slice(10, 15)
        }
    ];

    // Create Catalogs
    for (const catalog of catalogsData) {
        const catalogWithProducts = await prisma.catalog.create({
            data: {
                name: catalog.name,
                image_uri: catalog.image_uri,
                catalogProducts: {
                    create: catalog.products.map((productId : string) => ({
                        productId
                    }))
                }
            }
        });
        console.log("Catalog created:", catalogWithProducts);
    }

    await prisma.$disconnect();
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        console.log("Seeding finished");
    });

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var sampleProducts = [
    {
        name: 'VPN Premium',
        description: 'Secure VPN service for anonymous browsing and unrestricted access to global content.',
        price: 9.99,
        imageUrl: '/images/vpn-premium.jpg',
        category: 'VPN',
        stock: 100
    },
    {
        name: 'VPN Basic',
        description: 'Basic VPN service with essential protection and reasonable speed.',
        price: 4.99,
        imageUrl: '/images/vpn-basic.jpg',
        category: 'VPN',
        stock: 100
    },
    {
        name: 'AI Writing Assistant',
        description: 'AI-powered tool to help you write better content, correct grammar, and suggest improvements.',
        price: 14.99,
        imageUrl: '/images/ai-writing.jpg',
        category: 'AI Tools',
        stock: 50
    },
    {
        name: 'AI Image Generator',
        description: 'Generate stunning images from text descriptions using advanced AI technology.',
        price: 19.99,
        imageUrl: '/images/ai-image.jpg',
        category: 'AI Tools',
        stock: 30
    },
    {
        name: 'Cloud Storage 1TB',
        description: 'Secure cloud storage with 1TB capacity, file sharing, and automatic backup.',
        price: 8.99,
        imageUrl: '/images/cloud-storage.jpg',
        category: 'Cloud Services',
        stock: 200
    }
];
function seedProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, sampleProducts_1, product, existingProduct, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    console.log('Starting to seed products...');
                    _i = 0, sampleProducts_1 = sampleProducts;
                    _a.label = 1;
                case 1:
                    if (!(_i < sampleProducts_1.length)) return [3 /*break*/, 6];
                    product = sampleProducts_1[_i];
                    return [4 /*yield*/, prisma.product.findFirst({
                            where: {
                                name: product.name
                            }
                        })];
                case 2:
                    existingProduct = _a.sent();
                    if (!!existingProduct) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.product.create({
                            data: product
                        })];
                case 3:
                    _a.sent();
                    console.log("Created product: ".concat(product.name));
                    return [3 /*break*/, 5];
                case 4:
                    console.log("Product \"".concat(product.name, "\" already exists"));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log('Products seeding completed!');
                    return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error seeding products:', error_1);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, prisma.$disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
seedProducts();

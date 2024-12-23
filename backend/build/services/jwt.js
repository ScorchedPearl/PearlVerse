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
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
const jose_1 = require("jose");
const secretKey = "Hlo";
const encodedKey = new TextEncoder().encode(secretKey);
class JWTService {
    static generateTokenForUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const session = yield encrypt({ id: user.id, email: user.email, expiresAt: expiresAt });
            return session;
        });
    }
    static decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                console.log("No token provided");
                return undefined;
            }
            try {
                const { payload } = yield (0, jose_1.jwtVerify)(token, encodedKey, {
                    algorithms: ["HS256"],
                });
                const { id, email, expiresAt } = payload;
                const user = {
                    id, email, expiresAt: new Date(expiresAt),
                };
                return user;
            }
            catch (error) {
                console.error("Failed to verify token", error);
                return undefined;
            }
        });
    }
}
exports.default = JWTService;
function encrypt(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(encodedKey);
    });
}
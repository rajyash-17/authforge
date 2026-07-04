import { generateKeyPairSync } from "crypto";
import { mkdirSync,writeFileSync } from "fs";
import path from "path";

const {privateKey,publicKey}=generateKeyPairSync("rsa",{
    modulusLength:2048,

    publicKeyEncoding :{
        type:"spki",
        format:"pem",
    },

    privateKeyEncoding:{
        type:"pkcs8",
        format:"pem",
    }
});

const keysDir=path.join(process.cwd(),"keys");

mkdirSync(keysDir,{
    recursive:true,
});

writeFileSync(
    path.join(keysDir,"private.pem"),
    privateKey
)

writeFileSync(
    path.join(keysDir,"public.pem"),
    publicKey
)

console.log("✅ RSA key pair generated successfully!");
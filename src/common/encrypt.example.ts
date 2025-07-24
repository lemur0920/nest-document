import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
const iv = randomBytes(16);
const password = '키 생성에 사용할 비밀번호';

const key = (await promisify(scrypt)(password, 'salt', '32')) as Buffer;
const cipher = createCipheriv('aes-256-ctr', key, iv);

const textToEncrypt = 'Nest';
const encryptedTest = Buffer.concat([
  cipher.update(textToEncrypt),
  cipher.final(),
]);

const saltOrRounds = 10;
const password = 'random_password';
const hash = await bcrypt.hash(password, saltOrRounds);
const salt = await bcrypt.genSalt();
const isMatch = await bcrypt.compare(password, hash);
import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import Word from './models/Word';
import connectDB from './config/db';
import { fetchThirdPartyData } from './controllers/ThirdPartyHelpers';

dotenv.config({ path: './config/config.env' });

connectDB();

const wordsList = JSON.parse(fs.readFileSync(`${__dirname}/_data/words.json`))
  .map(w => ({
    origin: w,
    translation: w
  }));

const importData = async () => {
  try {
    const words = [];

    for (let i = 0; i < wordsList.length; i++) {
      const result = await fetchThirdPartyData(wordsList[i].origin);
      words.push({
        ...result,
        ...wordsList[i]
      });
    }

    await Word.create(words);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(e);
  }
};

const deleteData = async () => {
  try {
    await Word.deleteMany();
    console.log('Data deleted'.red.inverse);
    process.exit();
  } catch (e) {
    console.error(e);
  }
};

const processParam = process.argv[2];

if (processParam === 'import') {
  importData();
} else if (processParam === 'delete') {
  deleteData();
}

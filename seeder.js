import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import { fetchThirdPartyData, getDefinitionsArray } from './controllers/ThirdPartyHelpers';
import knexClient from './db';

dotenv.config({ path: './config/config.env' });

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
    const wordsRows = words.map(w => ({
      origin: w.origin,
      translation: w.translation,
      phonetic: w.phonetic,
      image_url: w.imgUrl,
    }));

    await knexClient('words').insert(wordsRows);
    const definitions = words.reduce((acc, w) => {
      acc.push(...getDefinitionsArray(w.definitions, w.origin));
      return acc;
    }, []);
    await knexClient('definitions').insert(definitions);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (e) {
    console.error(e);
  }
};

const deleteData = async () => {
  try {
    await knexClient('words').del();
    console.log('Data deleted'.green.inverse);
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

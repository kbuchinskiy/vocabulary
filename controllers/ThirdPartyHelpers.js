import axios from 'axios';

const getImageUrl = async (origin) => {
  const apiUrl = 'https://api.unsplash.com/search/photos/';
  const clientKey = 'NuyGiDzmhM5kOcJacYec_V8ZQ0lluCV2n71OahRoV2U';
  const unsplashUrl = `${apiUrl}?client_id=${clientKey}&query=${origin}`;
  const imageResponse = await axios.get(unsplashUrl);

  if (imageResponse.data.results.length) {
    return imageResponse.data.results[0].urls.raw;
  }
};

const fetchThirdPartyData = async (origin) => {
  const dataObj = {
    origin: '',
    phonetic: '',
    definitions: '',
    imgUrl: ''
  };
  try {
    const dictionaryResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${origin}`);

    dataObj.origin = dictionaryResponse.data[0].word;
    dataObj.phonetic = dictionaryResponse.data[0].phonetic || '';
    dataObj.definitions = dictionaryResponse.data[0].meanings;

    dataObj.definitions = dictionaryResponse.data[0].meanings.map(m => {
      const { partOfSpeech } = m;
      return {
        partOfSpeech,
        definitions: m.definitions.map(i => {
          return {
            definition: i.definition,
            example: i.example
          };
        }).filter(i => i)
      };

    });

  } catch (e) {
    console.log(e);
    return dataObj;
  }

  const imageUrl = await getImageUrl(origin);
  if (imageUrl) {
    dataObj.imgUrl = imageUrl;
  }
  return dataObj;
};

const getDefinitionsArray = (definitions, origin) => {
  return definitions.reduce((acc, item) => {
    item.definitions.forEach((d) => acc.push({
      origin_id: origin,
      part_of_speech: item.partOfSpeech,
      definition: d.definition,
      example: d.example,
    }));
    return acc;
  }, []);
};

export { fetchThirdPartyData, getDefinitionsArray };
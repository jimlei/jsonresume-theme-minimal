import { resolve } from 'path';
import { readFileSync } from 'fs';
import getConfig from "./config"

const getResume = () => {
  const lang = process.env.RESUME_VARIANT || 'en';
  
  try {    
    const localResume = readFileSync(resolve(__dirname, `resume-${lang}.json`));
    return JSON.parse(localResume);
  }
  catch (e) {
    const sampleResume = readFileSync(resolve(__dirname, 'resume.json'));
    return JSON.parse(sampleResume);
  }
}

const config = {
  ...getConfig(getResume()),
  root: __dirname,
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  }
}

export default config
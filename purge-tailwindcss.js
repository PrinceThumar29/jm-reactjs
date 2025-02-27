const Purgecss = require('purgecss');
const fs = require('fs');
const path = require('path');


// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
    static extract(content)
    {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

const purgecss = new Purgecss({
    content   : ['./src/**/*.js'],
    css       : ['./src/styles/tailwind.css'],
    whitelist : ["pl-24", "pl-40", "pl-56", "pl-72", "pl-80"],
    extractors: [
        {
            extractor : TailwindExtractor,
            extensions: ["html", "js"]
        }
    ]
});

const result = purgecss.purge();

result.forEach(out => {
    fs.writeFileSync(path.resolve(__dirname, out.file), out.css, 'utf-8');
});
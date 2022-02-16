const adjectives = [
    'retro', 
    'baffling',
    'passe',
    'old time',
    'evocative',
    'old',
    'old fashioned',
    '80s',
    '90s',
    '70s',
    'garbage',
    'ancient',
    'nostalgic',
    'powerful',
    'dumb',
    'stupid',
    'sweet',
    'tiny',
    'huge',
    'gold',
    'huge gold',
    'beautiful',
    'shiny',
    'smelly'
];

const nouns = [
    'skelton', 
    'shrimp',
    'donkey',
    'playstation',
    'chair',
    'gundam',
    'noodles',
    'vhs',
    'model',
    'toy',
    'board game',
    'rooster',
    'shark',
    'chips',
    'soda',
    'candy',
    'arbys'
];

const searchTerm = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`
}

module.exports = searchTerm
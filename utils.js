const fs = require('fs').promises;

////////////////////////////////////////////////////////////////////////////////
//              GENERAL
////////////////////////////////////////////////////////////////////////////////

function parseCommand(text) {
    const parts = text.trim().split(/\s+/);
    
    const cmd = parts[0];
    const data = parts[1];
    
    return { cmd, data };
}

////////////////////////////////////////////////////////////////////////////////
//              FILE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

async function parseID() {
    try {
        const data = await fs.readFile('./ids.json', 'utf8');
        const idsObject = JSON.parse(data);

        if (idsObject && idsObject.ids) {
            const ids = Object.keys(idsObject.ids);
            console.log('Parsed IDs:', ids);
            return ids; 
        } else {
            console.log('No IDs found.');
            return []; 
        }
    } catch (err) {
        console.error(`An error occurred while parsing IDs (${err})`);
        return [];
    }
}

async function saveID(id) {
    try {
        let idsObject = { ids: {} };

        try {
            const data = await fs.readFile('./ids.json', 'utf8');
            idsObject = JSON.parse(data);
        } catch (err) {
            console.log('No existing file found or error reading file, creating a new one.');
        }

        if (!idsObject.ids.hasOwnProperty(id)) {
            idsObject.ids[id] = true; 
           
            await fs.writeFile('./ids.json', JSON.stringify(idsObject, null, 2)); 
            console.log(`ID saved to file (${id})`);
        } else {
            console.log(`ID (${id}) already exists in the file.`);
        }
    } catch (err) {
        console.error(`An error occurred (${err})`);
    }
}

module.exports = {
    parseCommand,
    parseID,
    saveID
}

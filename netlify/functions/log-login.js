const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const logEntry = `${new Date().toISOString()} - ${data.appNumber} - ${data.name}\n`;
    
    // Append to log file
    const logPath = path.join(process.cwd(), 'login-log.txt');
    fs.appendFileSync(logPath, logEntry);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Logged successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to log' })
    };
  }
};

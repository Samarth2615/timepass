document.addEventListener('DOMContentLoaded', function() {
    // Security measures
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
        }
    });

    // DOM elements
    const loginForm = document.getElementById('loginForm');
    const resultContainer = document.getElementById('resultContainer');
    const appNumberInput = document.getElementById('appNumber');
    
    // CSV data storage
    let csvData = [];
    
    // Improved CSV loading with better parsing
    fetch('jee.csv')
        .then(response => response.text())
        .then(data => {
            // Normalize line endings and split lines
            const lines = data.replace(/\r/g, '').split('\n');
            
            // Skip empty lines and get headers
            const headers = lines[0].split('\t').map(h => h.trim());
            
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const obj = {};
                // Split by tab but handle potential empty fields
                const currentline = lines[i].split('\t');
                
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
                }
                
                csvData.push(obj);
            }
            
            console.log('Loaded student data:', csvData); // For debugging
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
            alert('Error loading student data. Please try again later.');
        });

    // Improved login form handler
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const appNumber = appNumberInput.value.trim();
        
        if (!appNumber) {
            alert('Please enter your application number');
            return;
        }
        
        // Case-insensitive search that trims values
        const student = csvData.find(item => {
            return (
                item['JEE MAINS'].trim().toLowerCase() === appNumber.toLowerCase() || 
                item['JEE ADVANCED'].trim().toLowerCase() === appNumber.toLowerCase()
            );
        });

        if (student) {
            console.log('Found student:', student); // For debugging
            
            try {
                // Log the login attempt
                await logLogin(appNumber, student['NAME']);
                
                // Display student info
                document.getElementById('candidateName').textContent = student['NAME'];
                document.getElementById('fatherName').textContent = student['FATHER NAME'];
                document.getElementById('motherName').textContent = student['MOTHER NAME'];
                
                // Set photo (using JEE MAINS number)
                const photoImg = document.getElementById('studentPhoto');
                photoImg.src = `${student['JEE MAINS']}.jpg`;
                photoImg.onerror = function() {
                    this.src = 'placeholder.jpg';
                };
                
                // Set result image (using JEE ADVANCED number)
                const resultImg = document.getElementById('resultImage');
                if (student['JEE ADVANCED']) {
                    resultImg.src = `${student['JEE ADVANCED']}.jpg`;
                    resultImg.onerror = function() {
                        this.src = 'placeholder.jpg';
                    };
                }
                
                // Set response sheets
                if (student['P1']) {
                    document.getElementById('p1Frame').src = student['P1'];
                }
                if (student['P2']) {
                    document.getElementById('p2Frame').src = student['P2'];
                }
                
                // Show results
                loginForm.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while processing your request.');
            }
        } else {
            console.log('Searching for:', appNumber);
            console.log('Available numbers:', csvData.map(s => [s['JEE MAINS'], s['JEE ADVANCED']]));
            alert(`Application number ${appNumber} not found. Please check your number and try again.`);
        }
    });

    // Netlify logging function
    async function logLogin(appNumber, name) {
        try {
            const response = await fetch('/.netlify/functions/log-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    appNumber: appNumber, 
                    name: name 
                }),
            });
            
            if (!response.ok) {
                throw new Error('Logging failed');
            }
        } catch (error) {
            console.error('Error logging:', error);
            // Fallback to client-side logging
            const timestamp = new Date().toISOString();
            const logEntry = `${timestamp} - ${appNumber} - ${name}\n`;
            localStorage.setItem('loginLogs', 
                (localStorage.getItem('loginLogs') || '') + logEntry);
        }
    }
});

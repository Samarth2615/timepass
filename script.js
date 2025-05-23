document.addEventListener('DOMContentLoaded', function() {
    // Security: Disable right click and F12
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Right-click is disabled for security reasons.');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            alert('Developer tools are disabled for security reasons.');
        }
    });

    // DOM elements
    const loginForm = document.getElementById('loginForm');
    const resultContainer = document.getElementById('resultContainer');
    const appNumberInput = document.getElementById('appNumber');
    
    // CSV data storage
    let csvData = [];
    
    // Load CSV data
    fetch('jee.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split('\t');
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '') continue;
                
                const obj = {};
                const currentline = lines[i].split('\t');
                
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : '';
                }
                
                csvData.push(obj);
            }
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
            alert('Error loading student data. Please try again later.');
        });

    // Login form handler
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const appNumber = appNumberInput.value.trim();
        
        if (!appNumber) {
            alert('Please enter your application number');
            return;
        }
        
        // Find student in CSV data
        const student = csvData.find(item => 
            item['JEE MAINS'] === appNumber || item['JEE ADVANCED'] === appNumber
        );

        if (student) {
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
                    photoImg.src = 'placeholder.jpg';
                    photoImg.alt = 'Photo not available';
                };
                
                // Set result image (using JEE ADVANCED number)
                const resultImg = document.getElementById('resultImage');
                if (student['JEE ADVANCED']) {
                    resultImg.src = `${student['JEE ADVANCED']}.jpg`;
                    resultImg.onerror = function() {
                        resultImg.src = 'placeholder.jpg';
                        resultImg.alt = 'Result not available yet';
                    };
                } else {
                    resultImg.src = 'placeholder.jpg';
                    resultImg.alt = 'Advanced result not available';
                }
                
                // Set response sheets if they exist
                if (student['P1']) {
                    document.getElementById('p1Frame').src = student['P1'];
                }
                if (student['P2']) {
                    document.getElementById('p2Frame').src = student['P2'];
                }
                
                // Show results section
                loginForm.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                
                // Scroll to results
                resultContainer.scrollIntoView({ behavior: 'smooth' });
                
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert('Application number not found. Please check your number and try again.');
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
            // Fallback to client-side logging if Netlify function fails
            const timestamp = new Date().toISOString();
            const logEntry = `${timestamp} - ${appNumber} - ${name}\n`;
            localStorage.setItem('loginLogs', 
                (localStorage.getItem('loginLogs') || '') + logEntry);
        }
    }

    // Admin log viewer (accessible via #admin in URL)
    if (window.location.hash === '#admin') {
        showAdminPanel();
    }

    function showAdminPanel() {
        // Create admin elements
        const adminDiv = document.createElement('div');
        adminDiv.style.position = 'fixed';
        adminDiv.style.top = '0';
        adminDiv.style.left = '0';
        adminDiv.style.right = '0';
        adminDiv.style.bottom = '0';
        adminDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
        adminDiv.style.zIndex = '10000';
        adminDiv.style.padding = '20px';
        adminDiv.style.overflow = 'auto';
        adminDiv.style.color = 'white';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close Admin';
        closeBtn.onclick = () => adminDiv.remove();
        closeBtn.style.marginBottom = '20px';
        
        const logsPre = document.createElement('pre');
        logsPre.style.whiteSpace = 'pre-wrap';
        
        // Try to get logs from Netlify function
        fetch('/.netlify/functions/get-logs')
            .then(res => res.text())
            .then(logs => {
                logsPre.textContent = logs || 'No logs found from server';
            })
            .catch(() => {
                // Fallback to client-side logs
                logsPre.textContent = localStorage.getItem('loginLogs') || 
                    'No logs available (server and client)';
            });
        
        adminDiv.appendChild(closeBtn);
        adminDiv.appendChild(logsPre);
        document.body.appendChild(adminDiv);
    }
});

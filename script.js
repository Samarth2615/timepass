document.addEventListener('DOMContentLoaded', function() {
    // Debugging - temporarily allow F12
    console.log("Script loaded successfully");

    // DOM elements
    const loginForm = document.getElementById('loginForm');
    const resultContainer = document.getElementById('resultContainer');
    const appNumberInput = document.getElementById('appNumber');
    
    // CSV data storage
    let csvData = [];
    
    // Load and parse CSV data
    fetch('jee.csv')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load CSV');
            return response.text();
        })
        .then(data => {
            console.log("Raw CSV data:", data);
            
            const lines = data.split('\n').filter(line => line.trim() !== '');
            if (lines.length < 2) throw new Error('No student data in CSV');
            
            const headers = lines[0].split('\t').map(h => h.trim());
            console.log("CSV headers:", headers);
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split('\t');
                const student = {};
                
                for (let j = 0; j < headers.length; j++) {
                    student[headers[j]] = values[j] ? values[j].trim() : '';
                }
                
                console.log(`Loaded student ${i}:`, student);
                csvData.push(student);
            }
            
            console.log("Total students loaded:", csvData.length);
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
            alert('Error loading student data. Please try again later.');
        });

    // Login form handler
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log("Form submitted");
        
        const appNumber = appNumberInput.value.trim();
        console.log("Searching for application number:", appNumber);
        
        if (!appNumber) {
            alert('Please enter your application number');
            return;
        }
        
        // Search for student (case-insensitive)
        const student = csvData.find(item => {
            const mainsMatch = item['JEE MAINS'].toLowerCase() === appNumber.toLowerCase();
            const advancedMatch = item['JEE ADVANCED'].toLowerCase() === appNumber.toLowerCase();
            return mainsMatch || advancedMatch;
        });

        if (student) {
            console.log("Found student:", student);
            
            try {
                // Display student info
                document.getElementById('candidateName').textContent = student['NAME'];
                document.getElementById('fatherName').textContent = student['FATHER NAME'];
                document.getElementById('motherName').textContent = student['MOTHER NAME'];
                
                // Set photo
                const photoImg = document.getElementById('studentPhoto');
                photoImg.src = `${student['JEE MAINS']}.jpg`;
                photoImg.onerror = () => {
                    photoImg.src = 'placeholder.jpg';
                    console.log("Couldn't load student photo");
                };
                
                // Set result image
                const resultImg = document.getElementById('resultImage');
                resultImg.src = `${student['JEE ADVANCED']}.jpg`;
                resultImg.onerror = () => {
                    resultImg.src = 'placeholder.jpg';
                    console.log("Couldn't load result image");
                };
                
                // Set response sheets
                const p1Frame = document.getElementById('p1Frame');
                const p2Frame = document.getElementById('p2Frame');
                
                if (student['P1'] && student['P1'].startsWith('http')) {
                    p1Frame.src = student['P1'];
                } else {
                    p1Frame.srcdoc = '<p>Paper 1 response not available</p>';
                }
                
                if (student['P2'] && student['P2'].startsWith('http')) {
                    p2Frame.src = student['P2'];
                } else {
                    p2Frame.srcdoc = '<p>Paper 2 response not available</p>';
                }
                
                // Show results
                loginForm.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                console.log("Results displayed successfully");
                
                // Try logging (optional)
                try {
                    await fetch('/.netlify/functions/log-login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            appNumber: appNumber, 
                            name: student['NAME'] 
                        })
                    });
                } catch (logError) {
                    console.log("Login logging failed (normal for local testing)", logError);
                }
                
            } catch (error) {
                console.error('Display error:', error);
                alert('An error occurred while displaying results.');
            }
        } else {
            console.log("Available application numbers:", 
                csvData.map(s => `${s['JEE MAINS']} / ${s['JEE ADVANCED']}`));
            alert(`Application number ${appNumber} not found. Please check your number.`);
        }
    });

    // Temporary debugging helper
    window.enableDebug = function() {
        console.log("Debug mode enabled");
        window.debugMode = true;
        localStorage.setItem('debug', 'true');
        alert("Debug mode enabled - check console");
    };
});

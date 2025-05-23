document.addEventListener('DOMContentLoaded', function() {
    // Disable right click and F12
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
        }
    });

    // Load CSV data
    let studentData = [];
    
    fetch('jee.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const headers = lines[0].split('\t');
            
            for (let i = 1; i < lines.length; i++) {
                const currentLine = lines[i].split('\t');
                if (currentLine.length === headers.length) {
                    let student = {};
                    for (let j = 0; j < headers.length; j++) {
                        student[headers[j].trim()] = currentLine[j].trim();
                    }
                    studentData.push(student);
                }
            }
        })
        .catch(error => console.error('Error loading CSV:', error));

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    const resultContainer = document.getElementById('resultContainer');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const appNo = document.getElementById('appNo').value.trim();
        const student = findStudent(appNo);
        
        if (student) {
            displayStudentData(student);
            resultContainer.style.display = 'block';
            window.scrollTo(0, 0);
        } else {
            alert('No record found with this application number. Please try again.');
        }
    });

    function findStudent(appNo) {
        return studentData.find(student => 
            student['JEE MAINS'] === appNo || student['JEE ADVANCED'] === appNo
        );
    }

    function displayStudentData(student) {
        // Display candidate details
        document.getElementById('candidateName').textContent = student['NAME'];
        document.getElementById('fatherName').textContent = student['FATHER NAME'];
        document.getElementById('motherName').textContent = student['MOTHER NAME'];
        document.getElementById('mainsAppNo').textContent = student['JEE MAINS'];
        document.getElementById('advancedAppNo').textContent = student['JEE ADVANCED'];
        
        // Set candidate photo
        const photoImg = document.getElementById('candidatePhoto');
        photoImg.src = `${student['JEE MAINS']}.jpg`;
        photoImg.onerror = function() {
            this.src = 'placeholder.jpg';
        };
        
        // Set result image
        const resultImg = document.getElementById('resultImage');
        resultImg.src = `${student['JEE ADVANCED']}.jpg`;
        resultImg.onerror = function() {
            this.src = 'placeholder.jpg';
        };
        
        // Set response sheets
        document.getElementById('p1Sheet').src = student['P1'];
        document.getElementById('p2Sheet').src = student['P2'];
    }
});

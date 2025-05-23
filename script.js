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

    // CSV data directly in the script (comma-separated)
    const csvData = `MAINS,JEE ADVANCED,NAME,FATHER NAME,MOTHER NAME,P1,P2
250310762047,K42221131120,AARADHANA,JAI KANWAR,POONAM DEVI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8087/17477405621378218/252007062_32044O251S1D8087E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7499/17477450692307889/252007062_32044O252S2D7499E1.html
250310665371,K41121145156,ANKUR,SATISH KUMAR,SUSHILA DEVI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8073/17477394993947022/252020378_32044O251S1D8073E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7485/17477434920968890/252020378_32044O252S2D7485E1.html`;

    // Parse CSV data (comma-separated)
    let studentData = [];
    const lines = csvData.split('\n');
    const headers = lines[0].trim().split(',');
    
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        if (currentLine) {
            const values = currentLine.split(',');
            if (values.length === headers.length) {
                let student = {};
                for (let j = 0; j < headers.length; j++) {
                    student[headers[j].trim()] = values[j].trim();
                }
                studentData.push(student);
            }
        }
    }

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
            this.alt = 'Photo not available';
        };
        
        // Set result image
        const resultImg = document.getElementById('resultImage');
        resultImg.src = `${student['JEE ADVANCED']}.jpg`;
        resultImg.onerror = function() {
            this.src = 'placeholder.jpg';
            this.alt = 'Result not available';
        };
        
        // Set response sheets
        document.getElementById('p1Sheet').src = student['P1'];
        document.getElementById('p2Sheet').src = student['P2'];
    }
});

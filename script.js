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
    const csvData = `JEE MAINS,JEE ADVANCED,NAME,FATHER NAME,MOTHER NAME,P1,P2

250310762047,K42221131120,AARADHANA,JAI KANWAR,POONAM DEVI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8087/17477405621378218/252007062_32044O251S1D8087E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7499/17477450692307889/252007062_32044O252S2D7499E1.html

250310665371,K41121145156,ANKUR,SATISH KUMAR,SUSHILA DEVI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8073/17477394993947022/252020378_32044O251S1D8073E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7485/17477434920968890/252020378_32044O252S2D7485E1.html

250311182071,K41121139108,CHIRAYU AGGARWAL,BANWARI LAL AGGARWAL,MONIKA AGGARWAL,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8219/17477396978938811/252018238_32044O251S1D8219E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7632/17477435012498168/252018238_32044O252S2D7632E2.html

250310001429,K42521009034,DAKSHA MITTAL,VINAY MITTAL,GARIMA MITTAL,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8087/17477405656981464/252007060_32044O251S1D8087E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7499/17477450687692729/252007060_32044O252S2D7499E1.html

250310218887,K41221064183,DIKSHANT KUMAR,SUNDEEP KUMAR,SONIA,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8325/17477391659072286/252022062_32044O251S1D8325E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7738/17477441519462749/252022062_32044O252S2D7738E1.html

250310843054,K42121038934,HARSHITA TYAGI,SUNDER PAL,RITU TYAGI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8093/1747739821413587/252004142_32044O251S1D8093E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7505/17477447908591615/252004142_32044O252S2D7505E1.html

250310182149,K41221047626,JAYESH KUMAR,AWDHESH KUMAR,RENU JAISWAL,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8092/17477401946753076/252005333_32044O251S1D8092E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7504/17477447943285573/252005333_32044O252S2D7504E1.html

250310004223,K41121011008,JAY PRASHANT ADIVAREKAR,PRASHANT ADIVAREKAR,SWATI ADIVAREKAR,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8104/17477392666103025/252102353_32044O251S1D8104E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7516/17477438508232279/252102353_32044O252S2D7516E1.html

250311174823,K41521068011,KESHAV,PREM,PREETI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D7914/17477402206569776/252010269_32044O251S1D7914E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7326/1747744409698142/252010269_32044O252S2D7326E1.html

250310763676,K42121106458,LAVANYA SHARMA,NARESH KUMAR,SUNITI SHARMA,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D7910/1747740307562338/252009023_32044O251S1D7910E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7322/17477449020844575/252009023_32044O252S2D7322E1.html

250311379857,K41121159251,MANN AHLAWAT,RAVINDER SINGH,RAJNI DHAIL,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8219/17477396980122718/252018306_32044O251S1D8219E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7632/17477435021779590/252018306_32044O252S2D7632E2.html

250310104675,K41421041790,RUDRANSH CHOUDHARY,ANIL KUMAR,NIRMALA,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8094/17477396947857536/252004280_32044O251S1D8094E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7506/17477447007083154/252004280_32044O252S2D7506E1.html

250310107070,K41121041789,SAMARTH,Confedencial,confedencial,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D7910/17477403084542871/252009005_32044O251S1D7810E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7322/17477449029089152/252009005_32044O252S1D7322E1.html

250310421434,K41121012638,SHUBHAM,SUDERSHAN KUMAR,SUDESH,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D7912/1747740461856298/252008108_32044O251S1D7912E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7324/17477449066644152/252008108_32044O252S2D7324E1.html

250310130831,K41521086043,VISHAL,VIJAY KUMAR SHARMA,VEENA KUMARI,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O251/32044O251S1D8148/17477394235192718/252016532_32044O251S1D8148E1.html,https://cdn3.digialm.com//per/g26/pub/32044/touchstone/AssessmentQPHTMLMode1//32044O252/32044O252S2D7560/1747744583011895/252016532_32044O252S2D7560E1.html`;

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

const fs = require('fs');
const path = require('path');

const junitPath = path.join(__dirname, 'coverage', 'junit.xml');
const outputPath = path.join(__dirname, 'coverage', 'test-report.xml');

try {
    const junitContent = fs.readFileSync(junitPath, 'utf8');
    
    // Crear el formato específico que espera SonarQube
    let sonarOutput = '<?xml version="1.0" encoding="UTF-8"?>\n<testExecutions version="1">\n';
    
    // Extraer cada testsuite
    const testsuites = junitContent.match(/<testsuite[^>]*>[\s\S]*?<\/testsuite>/g) || [];
    
    testsuites.forEach(testsuite => {
        const fileNameMatch = testsuite.match(/name="([^"]+)"/);
        const fileName = fileNameMatch ? fileNameMatch[1] : '';
        
        // Convertir Windows path a formato Unix
        const unixPath = fileName.replace(/\\/g, '/');
        
        sonarOutput += `  <file path="${unixPath}">\n`;
        
        // Extraer testcases
        const testcases = testsuite.match(/<testcase[^>]*>(?:[^<]*(?:<(?!\/testcase>)[^<]*)*<\/testcase>|[^<]*\/>)/g) || [];
        
        testcases.forEach(testcase => {
            const nameMatch = testcase.match(/name="([^"]+)"/);
            const timeMatch = testcase.match(/time="([^"]+)"/);
            const classMatch = testcase.match(/classname="([^"]+)"/);
            
            const testName = classMatch && nameMatch 
                ? `${classMatch[1]} - ${nameMatch[1]}`
                : (nameMatch ? nameMatch[1] : '');
            
            const duration = timeMatch 
                ? Math.round(parseFloat(timeMatch[1]) * 1000) 
                : 0;
            
            if (testcase.includes('<failure>')) {
                const failureMatch = testcase.match(/<failure[^>]*>([\s\S]*?)<\/failure>/);
                const message = failureMatch 
                    ? failureMatch[1]
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&apos;')
                        .trim()
                    : 'Test failed';
                
                sonarOutput += `    <testCase name="${testName}" duration="${duration}">\n`;
                sonarOutput += `      <failure message="${message}">Test failed</failure>\n`;
                sonarOutput += '    </testCase>\n';
            } else {
                sonarOutput += `    <testCase name="${testName}" duration="${duration}"/>\n`;
            }
        });
        
        sonarOutput += '  </file>\n';
    });
    
    sonarOutput += '</testExecutions>';

    // Escribir el archivo en formato SonarQube
    fs.writeFileSync(outputPath, sonarOutput);
    console.log('Archivo de pruebas convertido exitosamente para SonarQube');
} catch (error) {
    console.error('Error al convertir el archivo:', error);
    process.exit(1);
}
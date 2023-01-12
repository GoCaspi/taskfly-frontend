const scanner= require('sonarqube-scanner');
scanner({
        options:{
            "sonar.exclusions":"**/*.test.tsx",
            "sonar.tests":"./src",
            "sonar.test.inclusions":"**/*.test.tsx,**/*.test.ts",
            "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.testExecutionReportPaths": "coverage/test-report.xml",
            "sonar.login":"19a9356832eff71859a0a168c8b9175ec940fcc3",
        },
        serverUrl:"http://localhost:9000",
        login:"squ_e9e1cabed2a2fff96baa62ed74bdc7ba44e95694",
        options:{
            "sonar.sources":"./src"
        },
    },
    ()=>process.exit()
);

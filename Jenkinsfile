pipeline {
    environment {
        DEVOPS_API_KEY = credentials('devops-api-key')
        PROJECT_JOB_NAME = env.JOB_NAME.replace("/${env.JOB_BASE_NAME}", '')
        PROJECT_NAME = PROJECT_JOB_NAME.split('/').last()
        BUILD_TYPE = ''
        BUILD_IDENTIFIER = ''
        VERSION = ''
        registryFQDN = '798579554467.dkr.ecr.us-east-1.amazonaws.com'
        registryUrl = "https://${registryFQDN}/"
        registry = 'hkh/webapp'
        registryRegion = 'us-east-1'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Configure') {
            steps {
                script {
                    if (env.BRANCH_NAME == ~/^release\/v\d+(.\d+(.\d)?)?$/) {
                        BUILD_TYPE = 'release'
                    } else if (env.BRANCH_NAME == ~/^rc\/v\d+(.\d+(.\d)?)?+$/) {
                        BUILD_TYPE = 'rc'
                    } else {
                        BUILD_TYPE = 'dev'
                    }

                    def response = httpRequest url: "https://devops.bbapps.net/api/build-identifiers/${PROJECT_NAME}/${BUILD_TYPE}",
                        httpMode: 'PUT',
                        customHeaders: [
                            [name: 'X-API-Key', value: DEVOPS_API_KEY]
                        ],
                        contentType: 'APPLICATION_JSON'
                    BUILD_IDENTIFIER = response.content
                    if (BUILD_TYPE == 'dev') {
                        VERSION = "1.0.0-${BUILD_IDENTIFIER}"
                    } else {
                        def(version) = env.BRANCH_NAME = ~/^(?:release|rc)\/v(\d+(?:.\d+(?:.\d)?)?)$/
                        VERSION = version[1]
                    }
                }
            }
        }
        stage('Docker build') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$VERSION"
                }
            }
        }
        stage('Docker push') {
            steps {
                script {
                    def registryId = registryFQDN.tokenize(".")[0]

                    sh "\$(aws --region $registryRegion ecr get-login --registry-ids $registryId --no-include-email)"
                    docker.withRegistry(registryUrl) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    def image = "${registryFQDN}/${registry}:${VERSION}"
                    sh "docker rmi $image"
                }
            }
        }
    }
}

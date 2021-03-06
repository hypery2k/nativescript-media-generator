properties properties: [
        [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
        [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/hypery2k/nativescript-media-generator'],
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

node {
    def buildNumber = env.BUILD_NUMBER
    def branchName = env.BRANCH_NAME
    def mvnHome = '/opt/dev/apache-maven-3.3.1'
    def workspace = env.WORKSPACE
    def buildUrl = env.BUILD_URL
    env.PATH="${env.JAVA_HOME}/bin:${mvnHome}/bin:${env.PATH}"

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "build URL is $buildUrl"
    echo "build Number is $buildNumber"
    echo "branch name is $branchName"
    echo "PATH is $env.PATH"

    try {

      stage('Checkout') {
          checkout scm
      }

      stage('Build') {
          sh "npm install"
      }

      stage('Test') {
          wrap([$class: 'Xvfb']) {
            sh "npm run test"
            junit 'dist/reports/TEST-*.xml'
          }
      }

      stage('Publish NPM snapshot') {
        nodeJS.publishSnapshot('', buildNumber, branchName)
      }

    } catch (e) {
        mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
        throw e
    }
}

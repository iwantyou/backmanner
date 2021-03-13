pipeline {
  agent {
    node {
      label 'd'
    }

  }
  stages {
    stage('build') {
      steps {
        sh '''npm install
npm run build 
'''
      }
    }

  }
}
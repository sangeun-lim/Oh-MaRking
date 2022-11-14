pipeline {
    agent any

  stages {
    stage('Prepare') {
      steps {
        checkout scm
      }
      post {
          success {
            echo " prepare stage success"
          }
          failure {
            echo "prepare stage failed"
          }
      }
    }
   stage('Frontend') {
      steps {
        dir('frontend'){
          echo "here is frontend dir"
          sh 'docker rmi frontend-image'
          sh 'docker build -t frontend-image .'
          sh 'docker run -d --name frontend -p 3000:80 frontend-image'
        }
      }
      post {
        always {
          echo "stage complete"
        }
        failure {
          echo "failed"
        }
        success {
          echo "success"
        }
      }
    }
  }
}

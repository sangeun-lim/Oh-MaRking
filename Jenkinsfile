pipeline {
    agent any

  tools {
    gradle 'gradle'
  }

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
  //   stage('Frontend Build') {
  //     steps {
  //       dir('frontend'){
  //         echo "here is frontend dir"
  //         sh 'docker build -t frontend .'
  //         sh 'docker run -d --name fe -p 3000:80 frontend'
  //       }
  //     }
  //   }
    stage('Backend Build') {
      steps {
        dir('discoveryservice') {
          echo "here is discovery-service"
          sh 'docker stop discovery-service || true && docker rm discovery-service || true && docker rmi discovery-image || true'
          sh 'gradle clean build -x test -b build.gradle'
          sh 'docker build -t discovery-image'
        }
        dir('./api-gateway'){
          echo "here is api-gateway"
          sh 'docker stop gateway-service || true && docker rm gateway-service || true && docker rmi gateway-image || true'
          sh 'gradle clean build -x test -b build.gradle'
          sh 'docker build -t gateway-image'
        }
        dir('./user-service'){
          echo "here is user-service"
          sh 'docker stop user-service || true && docker rm user-service || true && docker rmi user-image || true'
          sh 'gradle clean build -x test -b build.gradle'
          sh 'docker build -t user-image'
        }
        dir('./business'){
          echo "here is business-service"
          sh 'docker stop business-service || true && docker rm business-service || true && docker rmi business-image || true'
          sh 'gradle clean build -x test -b build.gradle'
          sh 'docker build -t business-image'
        }
      }
      post {
        always {
          echo "build stage complete"
        }
        failure {
          echo "build failed"
        }
        success {
          echo "build success"
        }
      }
    }
    
    stage('Deploy') {
      steps {
        echo "deploy start"
        sh 'cd /'
        sh 'docker-compose up -d'
      }
      post {
        always {
          echo "deploy stage complete"
        }
        failure {
          echo "build failed"
        }
        success {
          echo "build success"
        }
      }
    }
  }
}

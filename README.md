🚨 Health Monitoring and Alerting System

The Health Monitoring and Alerting System is a cloud-native solution designed to monitor AWS infrastructure and notify teams in real time about performance issues osssr system events. It leverages core AWS services to provide a scalable, automated, and reliable alerting mechanism.

🔧 Technologies Used

    *Amazon EC2 – Hosts the monitored applications and services
    *Amazon CloudWatch – Collects metrics/logs, analyzes them, and defines alarms
    *AWS SNS (Simple Notification Service) – Sends alerts via email or SMS when alarms are triggered
    *AWS Lambda – Executes automated responses or custom workflows (e.g., restart EC2, send Slack alerts)

📌 Key Features

   Real-time monitoring of EC2 metrics and logs
   Threshold-based alarms via CloudWatch
   Instant notifications through SNS (email/SMS)
   Optional Lambda automation for system response
   Lightweight, serverless, and easy to deploy

🧭 Architecture Overview

   Monitors EC2 instances with CloudWatch → Triggers Alarms → Sends Notifications via SNS → Optionally Executes Lambda Automation

🚀 Getting Started

   ✅ Prerequisites

Make sure you have the following ready:

* AWS CLI configured (`aws configure`)
* IAM permissions for EC2, CloudWatch, SNS, and Lambda
* Git installed
* Node.js or Python (optional, for Lambda customization)

📥 Clone the Repository

    git clone https://github.com/gnanaprasunavisuals/health-monitoring-alerting-system

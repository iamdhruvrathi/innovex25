# Food Redistribution Platform - README

## KhanaConnect

## Overview

KhanaConnect is a simple, impactful platform built to tackle food waste by connecting hotels, restaurants, and other kitchens with people and institutions that genuinely need food. Our goal is to create a smarter and more humane way to make sure no meal goes to waste.

## Key Features

### 1. Kitchen Partnership

Kitchens and restaurants can sign up to share their daily surplus food with those in need. To ensure food safety, all kitchens are required to submit their FSSAI code during registration.

### 2. Seekers - Food Consumers

Seekers include government colleges, NGOs, old age homes, and similar institutions. They can register to request leftover food, helping ensure excess food is redirected instead of discarded.

### 3. Real-time Frontend Dashboard

We’ve built a dynamic frontend dashboard that shows live statistics—like the number of kitchens and seekers—and how they’re connected on our platform.

### 4. Interactive Map

A built-in map helps kitchens and seekers find each other based on location. This makes coordination and logistics much easier.

### 5. Volunteer Delivery System

A dedicated page allows volunteers to sign up and help deliver food between kitchens and seekers. This keeps the process smooth and efficient.

### 6. Email Notifications

Our system sends automatic email alerts:

- To admin, and seekers when a new kitchen registers.
    
- To delivery agents, when a delivery is ready to be fulfiled.
We have a pre built database of delivery agents, who will be notified throught email when a food is ready to be picked up. They can confirm
their task by visiting the provided link and confirming their identity.
    

### 7. Smart Matching Algorithm

We use a thoughtful algorithm to prioritize food distribution. It looks at factors like:

- How many times a seeker has received food
    
- How much food they need daily
    
- Proximity to the kitchen This helps us ensure fair, and efficient distribution.
    

## How our system works

1. **Kitchen Registration**: Kitchens list leftover food and submit their FSSAI code for safety compliance.
    
2. **Seeker Registration**: Institutions sign up, requesting their food.
    
3. **Matching Process**: The system pairs kitchens with seekers based on need and distance.
    
4. **Volunteer Involvement**: Delivery employees or volunteers will help with pickup and delivery.
    
5. **Email Alerts**: Automated notifications ensure smooth coordination.
    
6. **Delivery Completion**: Food is delivered where it’s needed—on time and safely.
    

---

With KhanaConnect, we’re not just cutting down on food waste—we’re building a community that cares. Every shared meal counts.

---


# Technology stack used:

Technology Stack Used
Our platform is built using the following technologies:

- Express.js – Backend framework for handling server logic and API routes

- Node.js – JavaScript runtime for building the server-side application

- Firebase Cloud Firestore – NoSQL database for storing kitchen, seeker, and donations data

- EJS (Embedded JavaScript) – Template engine for rendering dynamic content on the frontend

- HTML & CSS – For structuring and styling the user interface



## Database Schema:

1. Kitchens:
- name
- certifications
- delivery needed or not
- daily production
- average waste

2. Seekers
- institution type
- address
- contact
- daily need
- frequency needed
- recieved (auto increment)
  
3. Volunteers
- name
- email
- phone
- start Date
- work Type
- valid (boolean)

4. Kitchen Donations
- DateTime
- expiry info
- food amount
- food type
- kitchenID
- seekerID

5. Donations
- name
- email
- donation type
- address 
- quantity
  
6. Delivery Employees
- name
- email
- address
- phone number


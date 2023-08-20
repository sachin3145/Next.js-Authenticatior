# AUTHENTICATOR

## ABOUT

This repository contains a section of a web application built using Next.js, NextAuth.js, and MongoDB for authentication and data storage. It provides a foundation for implementing user authentication and managing user data within your Next.js application.

## Getting Started

### Installing Dependencies

```bash
npm i
```

### Setting up .env file:

```bash
# Create a new file in the root directory of your project and name it `.env`, add the following content into it.

MONGODB_URI=#<MONGODB_URI OF THE MONGODB DATABASE TO BE USED>
NEXTAUTH_SECRET=#<ANY LONG STRING OF RANDOM CHARACTERS>
NEXTAUTH_URL=http://localhost:3000/

```

### Running the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

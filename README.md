# Donatify

Donatify is a web application that connects people offering useful items with people who can receive them. The project combines a React interface, a Flask API, and a MySQL database.

This repository is my contribution fork of [TejasPrabhu/Donatify](https://github.com/TejasPrabhu/Donatify).

## My contributions

My work in this fork focused on authentication and project completion tasks, including:

- Backend registration and authentication logic
- One-time password generation and email-related utilities
- Input validation and authentication tests
- Bug fixes across the Flask application and utilities
- Supporting data and documentation updates

## Main features

- User registration and sign-in
- Donor and recipient profiles
- Item listing and discovery
- Donation and receipt history
- Authentication and account-verification flows

## Technology

- Python and Flask
- React
- MySQL
- JavaScript
- Pytest

## Repository structure

```text
src/Backend/   Flask API and utilities
src/frontend/  React client
src/database/  Database-related files
test/          Automated tests
docs/          Generated and project documentation
```

## Local setup

Install the Python dependencies in a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Windows users can activate the environment with:

```powershell
.venv\Scripts\Activate.ps1
```

The frontend has its own dependencies:

```bash
cd src/frontend
npm install
npm start
```

Database and email configuration must be supplied locally. Do not commit credentials or personal data.

## What I learned

- How authentication spans frontend, backend, database, and email services
- How to validate registration workflows with automated tests
- How a multi-service application benefits from clear configuration boundaries
- How to contribute focused changes to a shared repository

## Status

This is an archived contribution fork. Its dependencies and configuration should be reviewed and upgraded before reuse.

## License

This project is available under the license included in the repository. Credit for the original project and other contributions belongs to the upstream maintainers and contributors.


# Contributing to DevMatchups

Thank you for considering contributing to DevMatchups We welcome all contributions, whether it's fixing bugs, adding new features, improving documentation, or suggesting ideas. Please take a moment to read through the following guidelines before submitting a contribution.

---

## How Can You Contribute?

### 1. Reporting Bugs
- Ensure the issue was not already reported by searching [existing issues](https://github.com/harsh3dev/DevMatchups/issues).
- If you're reporting a new bug, please include:
  - Steps to reproduce the issue.
  - The environment in which the issue occurred (OS, browser, etc.).
  - Screenshots or error messages if applicable.

### 2. Suggesting Enhancements
- Check if the enhancement is already proposed in [existing issues](https://github.com/harsh3dev/DevMatchups/issues).
- Be clear about what you would like to see improved, and explain why it would be beneficial to the project.
- If possible, propose an implementation plan or approach.

### 3. Submitting Pull Requests
- Fork the repository and create a new branch for your feature or bugfix (`git checkout -b feature/my-feature`).
- Follow the project's coding standards (e.g., use consistent naming conventions, formatting, etc.).
- Ensure your code is well-commented, and explain the logic behind any complex code.
- Add necessary tests to cover the new code or changes.
- Make sure your code passes all tests (run `npm test` or any relevant command before submitting).
- Open a pull request and fill out the provided template. Provide a clear and concise description of the changes and link the related issue if applicable.

### 4. Documentation Improvements
- If you notice any errors or have suggestions for improving documentation, feel free to submit a pull request.
- Ensure that documentation changes are well-written, clear, and concise.


---

## Development Workflow

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harsh3dev/devmatchups
   cd Devmatchups
2. **Install dependencies**:
   ```bash
   npm install
3. **Run the project**:
   ```bash
   npm run dev
   ```
4. Submit a Pull Request: Once you're done, open a pull request on the main repository.

## Development Using Docker

1. **Make sure Docker is installed in your system**

2. **Build the Docker Image**
   ```bash
      docker-compose up -d
   ```
4. **Execute a command inside the Container**
   ```bash 
      docker-compose exec -it <service_name> <command>
   ```

5. **List all the running containers**
   ```bash
      docker-compose ps
   ```

6. **Stop a running container**

   *To stop a particular service*
      ```bash
         docker-compose stop <service_name>
      ```

   *To stop all services*
      ```bash
         docker-compose stop
      ```

7. **Remove all the running containers**
   ```bash
      docker-compose down
   ```
